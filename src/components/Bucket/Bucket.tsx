import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Bucket.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { IBucket } from "../../models/IBucket";
import { stringify } from "querystring";

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

  let custom: string = "";
  let calc = monthlyExspenses * recommendedRiskLevel;

  const saveBucket = async (e: FormEvent) => {
    // setRecommendedBucketSize(calc);

    e.preventDefault();
    setSavedStatus("");
    try {
      await updateDoc(doc(db, "users", currentUser.currentUser.uid), {
        [chosenBucket]: {
          bucketName: bucketName,
          bucketNumber: bucketNumber,
          inUse: true,
          recommendedBucketSize: recommendedBucketSize,
          targeBucketSize: targeBucketSize,
          actualBucketSize: actualBucketSize,
          suggestedBucketName: suggestedBucketName,
          recommendedRiskLevel: recommendedRiskLevel,
          selectedRiskLevel: selectedRiskLevel,
        },
      });
      console.log("saved");
      setSavedStatus("Sparat!");
      // navigate("/dashboard");
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
          recommendedBucketSize: recommendedBucketSize,
          targeBucketSize: targeBucketSize,
          actualBucketSize: actualBucketSize,
          suggestedBucketName: suggestedBucketName,
          recommendedRiskLevel: recommendedRiskLevel,
          selectedRiskLevel: selectedRiskLevel,
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
      setActualBucketSize(data.data()?.[chosenBucket].actualBucketSize);
      setRecommendedRiskLevel(data.data()?.[chosenBucket].recommendedRiskLevel);
      setSelectedRiskLevel(data.data()?.[chosenBucket].selectedRiskLevel);

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
    if (bucketId == "1") {
      console.log("ändring: ", selectedRiskLevel);
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

  return (
    <>
      <div>
        <form>
          <h1>Hink {bucketNumber}</h1>
          <label>
            Namnge din hink
            <br />
            <input
              type="text"
              placeholder={suggestedBucketName}
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
            />
          </label>
          <br />
          <br />
          {bucketNumber == 1 || bucketNumber == 2 ? (
            <div>
              <p>Rekomenderad hinkstorlek: {recommendedBucketSize}kr</p>
              <p>
                Baserat på risknivå: {recommendedBucketSizeBasedOnRiskLevel}kr
              </p>
            </div>
          ) : (
            <p>Resten</p>
          )}

          <label>
            Vald storlek
            <br />
            <input
              type="number"
              value={targeBucketSize}
              placeholder={recommendedBucketSize.toString()}
              onChange={(e) => setTargeBucketSize(parseInt(e.target.value))}
            />
          </label>
          <br />
          <br />
          <label>
            Nuvarande innehåll
            <br />
            <input
              type="number"
              value={actualBucketSize}
              onChange={(e) => setActualBucketSize(parseInt(e.target.value))}
            />
          </label>
          <br />
          <br />
          {bucketNumber == 1 || bucketNumber == 2 ? (
            <label>
              Risknivå {selectedRiskLevel}
              <br />
              <input
                type="range"
                min="1"
                max={recommendedRiskLevel}
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(parseInt(e.target.value))}
              />
              <br />
              <br />
            </label>
          ) : (
            <div></div>
          )}
          <button onClick={saveBucket} type="submit">
            Spara
          </button>
          <br />
          <br />
          <Link to="/dashboard">
            <button>Avbryt</button>
          </Link>
          <br />
          <br />
          <button disabled={disableButton} onClick={deleteBucket}>
            Radera
          </button>
        </form>
      </div>
    </>
  );
};
export default Bucket;
