import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Settings.scss";
import { FormEvent, useContext, useEffect, useState } from "react";
import { StateContext } from "../../contexts/StateProvider/StateProvider";

const Settings = () => {
  const navigate = useNavigate();

  const contextState = useContext(StateContext);
  const [currentUser, setCurrentUser] = useState(contextState);
  const [userName, setUserName] = useState<string>("");
  const [totalSavedAmount, setTotalSavedAmount] = useState<number>(0);
  const [monthlyExspenses, setMonthlyExspenses] = useState<number>(0);
  const [savedStatus, setSavedStatus] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSavedStatus("");
    try {
      await updateDoc(doc(db, "users", currentUser.currentUser.uid), {
        userName: userName,
        totalSavedAmount: totalSavedAmount,
        monthlyExspenses: monthlyExspenses,
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
    const fetchData = async () => {
      const data = await getDoc(doc(db, "users", currentUser.currentUser.uid));
      if (data.exists()) {
        console.log("Document data: ", data.data());
        setUserName(data.data().userName);
        setTotalSavedAmount(data.data().totalSavedAmount);
        setMonthlyExspenses(data.data().monthlyExspenses);
      } else {
        await setDoc(doc(db, "users", currentUser.currentUser.uid), {
          bucket1: {
            bucketName: "",
            suggestedBucketName: "ex. Buferthink",
            bucketNumber: 1,
            inUse: false,
            filled: false,
            softDeleted: false,
            recommendedBucketSize: 0,
            targeBucketSize: 0,
            actualBucketSize: 0,
            savedBucketAmount: 0,
            selectedRiskLevel: 3,
            recommendedRiskLevel: 3,
            maxRiskLevel: 5,
            percentageFilled: 0,
            useRecomendedSettings: false,
          },
          bucket2: {
            bucketName: "",
            suggestedBucketName: "ex. Mellanriskhinken",
            bucketNumber: 2,
            inUse: false,
            filled: false,
            softDeleted: false,
            recommendedBucketSize: 0,
            targeBucketSize: 0,
            actualBucketSize: 0,
            savedBucketAmount: 0,
            selectedRiskLevel: 5,
            recommendedRiskLevel: 5,
            maxRiskLevel: 7,
            percentageFilled: 0,
            useRecomendedSettings: false,
          },
          bucket3: {
            bucketName: "",
            suggestedBucketName: "ex. Högriskhinken",
            bucketNumber: 3,
            inUse: false,
            softDeleted: false,
            recommendedBucketSize: 0,
            targeBucketSize: 0,
            actualBucketSize: 0,
            savedBucketAmount: 0,
            selectedRiskLevel: 0,
            recommendedRiskLevel: 0,
            maxRiskLevel: 0,
            percentageFilled: 0,
            useRecomendedSettings: false,
          },
          bucket4: {
            bucketName: "",
            suggestedBucketName: "ex. Lekhinken",
            bucketNumber: 4,
            inUse: false,
            softDeleted: false,
            recommendedBucketSize: 0,
            targeBucketSize: 0,
            actualBucketSize: 0,
            savedBucketAmount: 0,
            selectedRiskLevel: 0,
            recommendedRiskLevel: 0,
            maxRiskLevel: 0,
            percentageFilled: 0,
            useRecomendedSettings: false,
          },
        });
        console.log("no document");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="settingsContainer">
        <h1>Inställningar</h1>
        {savedStatus}
        <p className="settingsText">
          Hej! Vi behöver lite information om dig för att ge dig den bästa
          rekommendationen.
          <br /> Du anger ditt namn och dina totala månadsutgifter nedan,
          behöver du hjälp med att räkna ut det?
          <br /> Använd då&nbsp;
          <a
            className="settingsLink"
            target="_blank"
            href="https://www.konsumentverket.se/om-konsumentverket/var-verksamhet/privatekonomi/budgetkalkylen/"
          >
            HallåKonsumnet.se
          </a>
          &nbsp;för att enkelt göra en kalkyl.
        </p>

        <form className="settingsForm" onSubmit={handleSubmit}>
          <input
            className="settingsInputs"
            required
            placeholder="Ange namn"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          {/* <label>
          Ange ditt totala sparade kapital
          <br />
          <input
            required
            type="number"
            value={totalSavedAmount}
            onChange={(e) => setTotalSavedAmount(parseInt(e.target.value))}
          />
        </label>
        <br />
        <br /> */}

          <input
            className="settingsInputs"
            required
            placeholder="Ange din totala månadskostnad"
            type="number"
            min="1"
            value={monthlyExspenses}
            onChange={(e) => setMonthlyExspenses(parseInt(e.target.value))}
          />

          <button className="settingsButtons" type="submit">
            Spara
          </button>
        </form>

        <Link to="/dashboard">
          <button className="settingsButtons">Tillbaka</button>
        </Link>
      </div>
    </>
  );
};

export default Settings;
