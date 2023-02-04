import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Bucket.scss";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { BsQuestionCircleFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { PatternFormat } from "react-number-format";

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
  const [chosenBucket, setchosenBucket] = useState<string>(`bucket${bucketId}`);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [recommendedBucketSize, setRecommendedBucketSize] = useState<number>(0);
  const [
    recommendedBucketSizeBasedOnRiskLevel,
    setRecommendedBucketSizeBasedOnRiskLevel,
  ] = useState<number>();
  const [targeBucketSize, setTargeBucketSize] = useState<number>(0);
  const [actualBucketSize, setActualBucketSize] = useState<number>(0);
  const [recommendedRiskLevel, setRecommendedRiskLevel] = useState<number>(0);
  const [maxRiskLevel, setMaxRiskLevel] = useState<number>(0);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<number>(0);
  const [firstBucketAmount, setFirstBucketAmount] = useState<number>();
  const [percentageFilled, setPercentageFilled] = useState<number>();
  const [useRecomendedSettings, setUseRecomendedSettings] =
    useState<boolean>(false);
  const [inUse, setInUse] = useState<boolean>();
  const [resetBucket, setResetBucket] = useState<boolean>(true);
  const [softDeleted, setSoftDeleted] = useState<boolean>();
  const [helpTooltip, setHelpTooltip] = useState<boolean>(false);
  const [deleteBucketButton, setDeleteBucketButton] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("kr");

  // bucket number + 1, to disable create new bucket button when more then 4 buckets.
  let bucketCheck: string = "";

  // Calculation for recommended bucket size
  let recommendedBucketSizeCalculation =
    monthlyExspenses * recommendedRiskLevel;

  const saveBucket = async (e: FormEvent) => {
    console.log(maxRiskLevel);
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
          maxRiskLevel: maxRiskLevel,
          selectedRiskLevel: selectedRiskLevel,
          percentageFilled: percentageFilled,
          useRecomendedSettings: useRecomendedSettings,
        },
      });
      setSavedStatus("Sparat!");
      navigate("/dashboard");
    } catch (e) {
      setSavedStatus("Det gick inte att spara");
    }
  };

  const deleteButton = () => {
    setDeleteBucketButton(true);
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
          maxRiskLevel: maxRiskLevel,
          selectedRiskLevel: selectedRiskLevel,
          percentageFilled: percentageFilled,
          useRecomendedSettings: useRecomendedSettings,
        },
      });
      setSavedStatus("Sparat!");
      navigate("/dashboard");
    } catch (e) {
      setSavedStatus("Det gick inte att spara");
      console.log(e);
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
      bucketCheck = `bucket${parseInt(bucketId) + 1}`;
    }

    const fetchData = async () => {
      const data = await getDoc(doc(db, "users", currentUser.currentUser.uid));

      setFirstBucketAmount(data.data()?.bucket1.recommendedBucketSize);
      setTotalSavedAmount(data.data()?.totalSavedAmount);
      setMonthlyExspenses(data.data()?.monthlyExspenses);
      setTargeBucketSize(data.data()?.[chosenBucket].targeBucketSize);
      setActualBucketSize(data.data()?.[chosenBucket].savedBucketAmount);
      setRecommendedRiskLevel(data.data()?.[chosenBucket].recommendedRiskLevel);
      setMaxRiskLevel(data.data()?.[chosenBucket].maxRiskLevel);
      setSelectedRiskLevel(data.data()?.[chosenBucket].selectedRiskLevel);
      setInUse(data.data()?.[chosenBucket].inUse);
      setSoftDeleted(data.data()?.[chosenBucket].softDeleted);
      setUseRecomendedSettings(
        data.data()?.[chosenBucket].useRecomendedSettings
      );

      setBucketName(data.data()?.[chosenBucket].bucketName);
      setSuggestedBucketName(data.data()?.[chosenBucket].suggestedBucketName);

      if (bucketCheck == "bucket5") {
        setDisableButton(false);
      } else if (data.data()?.[bucketCheck].inUse) {
        setDisableButton(true);
      }

      if (!bucketId) {
        return;
      } else {
        setBucketNumber(parseInt(bucketId));
      }
    };
    setRecommendedBucketSize(recommendedBucketSizeCalculation);

    fetchData();
  }, [monthlyExspenses]);

  useEffect(() => {
    if (bucketId === "1") {
      setRecommendedBucketSizeBasedOnRiskLevel(
        monthlyExspenses * selectedRiskLevel
      );
    } else if (firstBucketAmount) {
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

    setBucketName("");
    setUseRecomendedSettings(false);
    setSelectedRiskLevel(1);
    setTargeBucketSize(0);
    setActualBucketSize(0);
    setSoftDeleted(false);
  };

  const resetBucketRender = () => {
    if (softDeleted == true) {
      if (
        bucketName == "" &&
        useRecomendedSettings == false &&
        selectedRiskLevel <= 1 &&
        targeBucketSize == 0 &&
        actualBucketSize == 0
      ) {
        return;
      }
      if (
        bucketName != "" ||
        useRecomendedSettings == true ||
        selectedRiskLevel > 1 ||
        targeBucketSize != 0 ||
        actualBucketSize != 0
      ) {
        return (
          <div className="resetBucketconatiner">
            <button
              className="disableResetBucketRenderButton"
              onClick={disableResetBucketRender}
            >
              <MdClose
                style={{ color: "#000000", width: "20px", height: "20px" }}
              />
            </button>
            <p className="resetBucketconatinerText">
              Detta är sedan tidigare en använd hink, vill du nollställa den?{" "}
              <BsQuestionCircleFill className="toolTipQuestionmark" />
            </p>
            <button className="resetValuesButton" onClick={renderResetButton}>
              Nollställ
            </button>
          </div>
        );
      }
    }
    return;
  };

  const disableResetBucketRender = () => {
    setResetBucket(false);
  };

  const helpToogle = () => {
    setHelpTooltip(!helpTooltip);
  };

  const tooltipBucket = () => {
    if (bucketNumber == 1 && helpTooltip == true) {
      return (
        <p className="helptextarea">
          Bufferthinken <br /> Pengarna bör sättas på ett sparkonto med ränta,
          lätta att kunna ta ut vid behov.
        </p>
      );
    }
    if (bucketNumber == 2 && helpTooltip == true) {
      return (
        <p className="helptextarea">
          Mellanriskhinken <br />
          Dessa pengar bör få chansen att växa lite, förslagsvis med
          fördelningen 60% Aktier och 40% Räntepapper.
        </p>
      );
    }
    if (bucketNumber == 3 && helpTooltip == true) {
      return (
        <p className="helptextarea">
          Högriskhinken <br />
          Här ska pengarna växa! Förslagsvis 100% Aktier
        </p>
      );
    }
    if (bucketNumber == 4 && helpTooltip == true) {
      return (
        <p className="helptextarea">
          Lekhinken! <br />
          Här kan du placera alternativa tillgångar, hinken rekommenderas inte
          överstiga 10% av Hink 3
        </p>
      );
    }
  };

  const renderBucketSettings = () => {
    if (useRecomendedSettings) {
      return (
        <div className="recommendedSettingsConatiner">
          {bucketNumber === 1 || bucketNumber === 2 ? (
            <div>
              <p>
                Här kan du öka eller sänka hinkens storlektsnivå, vi
                rekommenderar att Hink{bucketNumber} bör minst innehålla:
                {recommendedBucketSizeBasedOnRiskLevel}kr
              </p>
            </div>
          ) : (
            <p></p>
          )}
          {bucketNumber === 1 || bucketNumber === 2 ? (
            <div className="recommendedSettingsRangeContainer">
              <BsQuestionCircleFill className="toolTipQuestionmark" />
              <p>Storleksnivå {selectedRiskLevel}</p>
              <input
                type="range"
                min="1"
                max={maxRiskLevel}
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

  /////////////////////////////////////////////////////  /////////////////////////////////////////////////////  /////////////////////////////////////////////////////

  const formattedActualBucketSize = actualBucketSize
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  /////////////////////////////////////////////////////  /////////////////////////////////////////////////////  /////////////////////////////////////////////////////

  const formattedtargeBucketSize = targeBucketSize
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  /////////////////////////////////////////////////////  /////////////////////////////////////////////////////  /////////////////////////////////////////////////////

  return (
    <>
      <div className="bucketWraper">
        <div className="topConainer">
          <div className="emptyBox"></div>

          <div className="middleEmptyBox">
            <h1>Hink {bucketNumber} </h1>{" "}
            <div className="selectedBucketQuestionmarkConatiner">
              <button
                onClick={helpToogle}
                className="selectedBucketQuestionmarkButton"
              >
                <BsQuestionCircleFill className="selectedBucketQuestionmark" />
              </button>
            </div>
          </div>

          <div className="emptyBox"></div>
        </div>

        <div>
          {helpTooltip ? (
            <div className="helpConatiner">{tooltipBucket()}</div>
          ) : (
            <p></p>
          )}
        </div>
        <div className="bucketContainer">
          {resetBucket ? <div>{resetBucketRender()}</div> : <p></p>}

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
                <p>Nivåinställning</p>
                <input
                  type="checkbox"
                  checked={useRecomendedSettings}
                  onChange={handleCheckboxChange}
                />{" "}
                <BsQuestionCircleFill className="toolTipQuestionmark" />
              </div>
            ) : (
              <p></p>
            )}

            {renderBucketSettings()}

            <div className="bucketAmountConatiner">
              {bucketNumber === 1 || bucketNumber === 2 ? (
                <p>
                  Baserat på din angivna månadsutgift rekommenderar vi att Hink
                  {bucketNumber} minst innehåller: {recommendedBucketSize}kr
                </p>
              ) : (
                <p></p>
              )}

              {bucketNumber === 3 ? (
                <p>
                  När hink 1 och 2 är fyllda så börjar du fylla den här hinken
                </p>
              ) : null}
              {bucketNumber === 4 ? (
                <p>En rekomendation är att ha ca 10% av Hink 3 i denna hink</p>
              ) : null}

              <p>
                Vald storlek{" "}
                <BsQuestionCircleFill className="toolTipQuestionmark" />
              </p>

              <input
                type="text"
                required
                placeholder={recommendedBucketSize.toString() + "kr"}
                value={formattedtargeBucketSize}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setTargeBucketSize(0);
                  } else {
                    const parsedValue = parseInt(
                      e.target.value.replace(/\s/g, "")
                    );
                    if (!isNaN(parsedValue)) {
                      setTargeBucketSize(parsedValue);
                    }
                  }
                }}
              />

              <p>
                Nuvarande innehåll{" "}
                <BsQuestionCircleFill className="toolTipQuestionmark" />
              </p>

              {/* Thanks ChatGPT <3 */}

              <input
                type="text"
                required
                placeholder="Kr"
                value={actualBucketSize === 0 ? "" : formattedActualBucketSize}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setActualBucketSize(0);
                  } else {
                    const parsedValue = parseInt(
                      e.target.value.replace(/\s/g, "")
                    );
                    if (!isNaN(parsedValue)) {
                      setActualBucketSize(parsedValue);
                    }
                  }
                }}
              />

              <div className="bucketSubmitButtons">
                <button className="saveButton" type="submit">
                  Spara
                </button>
                <Link to="/dashboard">
                  <button>Avbryt</button>
                </Link>
                {deleteBucketButton ? (
                  <div>
                    {inUse ? (
                      <button
                        className="sureToDeleteButton"
                        disabled={disableButton}
                        onClick={deleteBucket}
                      >
                        Säker?
                      </button>
                    ) : (
                      <p></p>
                    )}
                  </div>
                ) : (
                  <button className="deleteButton" onClick={deleteButton}>
                    Radera
                  </button>
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
