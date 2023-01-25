import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Bucket.scss";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { IBucket } from "../../models/IBucket";

const Bucket = () => {
  let { bucketId } = useParams();
  const navigate = useNavigate();
  const contextState = useContext(StateContext);
  const [currentUser, setCurrentUser] = useState(contextState);
  const [totalSavedAmount, setTotalSavedAmount] = useState<number>(0);
  const [monthlyExspenses, setMonthlyExspenses] = useState<number>(0);
  const [bucketName, setBucketName] = useState<string>("");
  const [suggestedBucketName, setSuggestedBucketName] = useState<string>("");
  const [bucketNumber, setBucketNumber] = useState<number>();
  const [savedStatus, setSavedStatus] = useState<string>("");
  const [chosenBucket, setchosenBucket] = useState(`bucket${bucketId}`);
  const [disableButton, setDisableButton] = useState(false);
  const [recommendedBucketSize, setRecommendedBucketSize] = useState<number>(0);
  const [
    recommendedBucketSizeBasedOnRiskLevel,
    setRecommendedBucketSizeBasedOnRiskLevel,
  ] = useState<number>();
  const [targeBucketSize, setTargeBucketSize] = useState<number>(0);
  const [actualBucketSize, setActualBucketSize] = useState<number>(0);
  const [recommendedRiskLevel, setRecommendedRiskLevel] = useState<number>(0);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<number>(0);
  const [firstBucketAmount, setFirstBucketAmount] = useState<number>();
  const [percentageFilled, setPercentageFilled] = useState<number>();
  const [useRecomendedSettings, setUseRecomendedSettings] = useState(false);
  const [useCustomBucketSize, setUseCustomBucketSize] = useState(false);
  const [inUse, setInUse] = useState();
  const [softDeleted, setSoftDeleted] = useState<boolean>();

  let custom: string = "";
  let calc = monthlyExspenses * recommendedRiskLevel;

  const saveBucket = async (e: FormEvent) => {
    console.log(percentageFilled);

    e.preventDefault();
    setSavedStatus("");
    try {
      await updateDoc(doc(db, "users", currentUser.currentUser.uid), {
        [chosenBucket]: {
          bucketName: bucketName,
          bucketNumber: bucketNumber,
          inUse: true,
          softDeleted: false,
          recommendedBucketSize: recommendedBucketSize,
          targeBucketSize: targeBucketSize,
          actualBucketSize: actualBucketSize,
          savedBucketAmount: actualBucketSize,
          suggestedBucketName: suggestedBucketName,
          recommendedRiskLevel: recommendedRiskLevel,
          selectedRiskLevel: selectedRiskLevel,
          percentageFilled: percentageFilled,
          useRecomendedSettings: useRecomendedSettings,
        },
      });
      console.log("saved");
      setSavedStatus("Sparat!");
      navigate("/dashboard");
    } catch (e) {
      setSavedStatus("Det gick inte att spara");
      console.error(e);
    }
  };

  const deleteBucket = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", currentUser.currentUser.uid), {
        [chosenBucket]: {
          bucketName: bucketName,
          bucketNumber: bucketNumber,
          inUse: false,
          softDeleted: true,
          recommendedBucketSize: recommendedBucketSize,
          targeBucketSize: targeBucketSize,
          actualBucketSize: 0,
          savedBucketAmount: actualBucketSize,
          suggestedBucketName: suggestedBucketName,
          recommendedRiskLevel: recommendedRiskLevel,
          selectedRiskLevel: selectedRiskLevel,
          percentageFilled: percentageFilled,
          useRecomendedSettings: useRecomendedSettings,
        },
      });
      console.log("saved");
      setSavedStatus("Sparat!");
      navigate("/dashboard");
    } catch (e) {
      setSavedStatus("Det gick inte att spara");
      console.error(e);
    }
  };

  useEffect(() => {
    if (bucketId) {
      let urlnumber = parseInt(bucketId);
      if (urlnumber > 4) {
        navigate("/dashboard");
        return;
      }
    }

    if (bucketId) {
      custom = `bucket${parseInt(bucketId) + 1}`;
    }

    const fetchData = async () => {
      const data = await getDoc(doc(db, "users", currentUser.currentUser.uid));

      setFirstBucketAmount(data.data()?.bucket1.recommendedBucketSize);
      setTotalSavedAmount(data.data()?.totalSavedAmount);
      setMonthlyExspenses(data.data()?.monthlyExspenses);
      setTargeBucketSize(data.data()?.[chosenBucket].targeBucketSize);
      setActualBucketSize(data.data()?.[chosenBucket].savedBucketAmount);
      setRecommendedRiskLevel(data.data()?.[chosenBucket].recommendedRiskLevel);
      setSelectedRiskLevel(data.data()?.[chosenBucket].selectedRiskLevel);
      setInUse(data.data()?.[chosenBucket].inUse);
      setSoftDeleted(data.data()?.[chosenBucket].softDeleted);
      setUseRecomendedSettings(
        data.data()?.[chosenBucket].useRecomendedSettings
      );

      setBucketName(data.data()?.[chosenBucket].bucketName);
      setSuggestedBucketName(data.data()?.[chosenBucket].suggestedBucketName);

      if (custom == "bucket5") {
        setDisableButton(false);
      } else if (data.data()?.[custom].inUse) {
        setDisableButton(true);
      }

      if (!bucketId) {
        return;
      } else {
        setBucketNumber(parseInt(bucketId));
      }
    };
    setRecommendedBucketSize(calc);
    console.log("calc: ", calc);
    console.log("selectedRiskLevel: ", selectedRiskLevel);

    fetchData();
  }, [monthlyExspenses]);

  useEffect(() => {
    if (bucketId === "1") {
      setRecommendedBucketSizeBasedOnRiskLevel(
        monthlyExspenses * selectedRiskLevel
      );
    } else if (firstBucketAmount) {
      console.log(firstBucketAmount);
      setRecommendedBucketSizeBasedOnRiskLevel(
        firstBucketAmount * selectedRiskLevel
      );
      setRecommendedBucketSize(firstBucketAmount * recommendedRiskLevel);
    }
  }, [selectedRiskLevel]);

  useEffect(() => {
    if (targeBucketSize == 0 || actualBucketSize == 0) {
      setPercentageFilled(0);
    } else {
      setPercentageFilled(
        Math.round((100 * actualBucketSize) / targeBucketSize)
      );
    }
  }, [actualBucketSize, targeBucketSize]);

  const handleCheckboxChange = () => {
    setUseRecomendedSettings(!useRecomendedSettings);
  };

  const handleCustomBucketSizeCheckbox = (e: FormEvent) => {
    e.preventDefault();
    if (recommendedBucketSizeBasedOnRiskLevel)
      setTargeBucketSize(recommendedBucketSizeBasedOnRiskLevel);
  };

  const renderResetButton = (e: FormEvent) => {
    e.preventDefault();
    if (
      !softDeleted ||
      bucketName != "" ||
      useRecomendedSettings != false ||
      selectedRiskLevel! > 1 ||
      targeBucketSize > 0 ||
      actualBucketSize > 0
    ) {
      setBucketName("");
      setUseRecomendedSettings(false);
      setSelectedRiskLevel(1);
      setTargeBucketSize(0);
      setActualBucketSize(0);
      setSoftDeleted(false);
      console.log("reset");
    }
  };

  const renderContent = () => {
    if (useRecomendedSettings) {
      return (
        <div className="recommendedSettingsConatiner">
          {bucketNumber === 1 || bucketNumber === 2 ? (
            <div>
              <p>
                Här kan du öka eller sänka säkerhetsnivån och baserat på den
                rekommenderar vi att Hink{bucketNumber} bör minst innehålla:
                {recommendedBucketSizeBasedOnRiskLevel}kr
              </p>
            </div>
          ) : (
            <p></p>
          )}
          {bucketNumber === 1 || bucketNumber === 2 ? (
            <div className="recommendedSettingsRangeContainer">
              <p>Säkerhetsnivå {selectedRiskLevel}</p>
              <input
                type="range"
                min="1"
                max={recommendedRiskLevel}
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(parseInt(e.target.value))}
              />
              <button onClick={handleCustomBucketSizeCheckbox}>
                Använda valda summan
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <div className="bucketWraper">
        <div className="topConainer">
          <div className="emptyBox">
            <h1></h1>
          </div>
          <div className="emptyBox">
            <h1>Hink {bucketNumber}</h1>
          </div>
          <div className="emptyBox">
            <h1></h1>
          </div>
        </div>
        <div className="bucketContainer">
          {softDeleted ? (
            <div className="resetBucketconatiner">
              <p>
                Detta är sedan tidigare en använd hink, vill du nollställa den?
              </p>
              <button className="resetValuesButton" onClick={renderResetButton}>
                Nollställ
              </button>
            </div>
          ) : (
            <p></p>
          )}

          <form className="bucketForm" onSubmit={saveBucket}>
            <div className="customBucketName">
              <p>Namnge din hink</p>
              <input
                className="customBucketNameInput"
                type="text"
                placeholder={suggestedBucketName}
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
              />
            </div>

            {bucketNumber === 1 || bucketNumber === 2 ? (
              <div className="bucketRecommendedSettings">
                <p>Ändra från rekommenderade inställningar?</p>
                <input
                  type="checkbox"
                  checked={useRecomendedSettings}
                  onChange={handleCheckboxChange}
                />
              </div>
            ) : (
              <p></p>
            )}

            {renderContent()}

            <div className="bucketAmountConatiner">
              <p>
                Baserat på din angivna månadsutgift rekommenderar vi att Hink
                {bucketNumber} minst innehåller: {recommendedBucketSize}kr
              </p>

              <p>Vald storlek</p>
              <input
                type="number"
                required
                value={targeBucketSize}
                placeholder={recommendedBucketSize.toString()}
                onChange={(e) => setTargeBucketSize(parseInt(e.target.value))}
              />

              <p>Nuvarande innehåll</p>
              <input
                type="number"
                required
                min={0}
                value={actualBucketSize}
                onChange={(e) => setActualBucketSize(parseInt(e.target.value))}
              />

              <div className="bucketSubmitButtons">
                <button type="submit">Spara</button>
                <Link to="/dashboard">
                  <button>Avbryt</button>
                </Link>
                {inUse ? (
                  <button disabled={disableButton} onClick={deleteBucket}>
                    Radera
                  </button>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="bucketButtomContainer">
          <h1></h1>
        </div>
      </div>
    </>
  );
};
export default Bucket;
