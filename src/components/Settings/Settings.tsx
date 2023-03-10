import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FormEvent, useContext, useEffect, useState } from "react";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import "./Settings.scss";

const Settings = () => {
  const navigate = useNavigate();

  const contextState = useContext(StateContext);
  const [currentUser, setCurrentUser] = useState(contextState);
  const [userName, setUserName] = useState<string>("");
  const [monthlyExspenses, setMonthlyExspenses] = useState<number>(0);
  const [savedStatus, setSavedStatus] = useState<string>("");
  const [newUser, setNewUser] = useState<boolean>(true);

  const handleSaveSettings = async (e: FormEvent) => {
    e.preventDefault();
    setSavedStatus("");
    try {
      await updateDoc(doc(db, "users", currentUser.currentUser.uid), {
        userName: userName,
        monthlyExspenses: monthlyExspenses,
      });
      setSavedStatus("Sparat!");
      navigate("/dashboard");
    } catch (e) {
      setSavedStatus("Det gick inte att spara");
    }
  };

  // getting saved data and sets the database structure
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDoc(doc(db, "users", currentUser.currentUser.uid));
      if (data.exists()) {
        setUserName(data.data().userName);
        setMonthlyExspenses(data.data().monthlyExspenses);
        setNewUser(false);
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
            montlySavings: 0,
            savedMontlySavings: 0,
            investForm: "",
            freetext: "",
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
            montlySavings: 0,
            savedMontlySavings: 0,
            investForm: "",
            freetext: "",
          },
          bucket3: {
            bucketName: "",
            suggestedBucketName: "ex. H??griskhinken",
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
            montlySavings: 0,
            savedMontlySavings: 0,
            investForm: "",
            freetext: "",
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
            montlySavings: 0,
            savedMontlySavings: 0,
            investForm: "",
            freetext: "",
          },
          userName: "",
          monthlyExspenses: 0,
        });
      }
    };

    fetchData();
  }, []);

  // formatted digits
  const formattedMonthlyExspenses = monthlyExspenses
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <>
      <div className="settingsWraper">
        <div className="settingsContainer">
          <h1>Inst??llningar</h1>
          {savedStatus}
          <p className="settingsText">
            Hej! Vi beh??ver lite information om dig f??r att ge dig den b??sta
            rekommendationen.
            <br /> Du anger ditt namn och dina totala m??nadsutgifter nedan,
            beh??ver du hj??lp med att r??kna ut det?
            <br /> Anv??nd d??&nbsp;
            <a
              className="settingsLink"
              target="_blank"
              href="https://www.konsumentverket.se/om-konsumentverket/var-verksamhet/privatekonomi/budgetkalkylen/"
            >
              Hall??Konsumnet.se
            </a>
            &nbsp;f??r att enkelt g??ra en kalkyl.
          </p>

          <form className="settingsForm" onSubmit={handleSaveSettings}>
            <label className="label" htmlFor="nameInput">
              Namn
            </label>
            <div className="inputContainer">
              <div className="inputContainerLeftSpacer"></div>

              <input
                className="settingsInputs"
                name="nameInput"
                required
                placeholder="Ange namn"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <p className="inputContainerText"></p>
            </div>

            <label className="label" htmlFor="montlyAmountInput">
              M??nadsutgift
            </label>
            <div className="inputContainer">
              <div className="inputContainerLeftSpacer"></div>

              <input
                className="settingsInputs"
                name="montlyAmountInput"
                required
                placeholder="Ange dina totala m??nadsutgifter"
                type="text"
                min="1"
                value={formattedMonthlyExspenses}
                inputMode="numeric"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setMonthlyExspenses(0);
                  } else {
                    const parsedValue = parseInt(
                      e.target.value.replace(/\s/g, "")
                    );
                    if (!isNaN(parsedValue)) {
                      setMonthlyExspenses(parsedValue);
                    }
                  }
                }}
              />
              <p className="inputContainerText">kr</p>
            </div>

            <button className="settingsButtons" type="submit">
              Spara
            </button>
          </form>
          {newUser ? (
            <p></p>
          ) : (
            <Link to="/dashboard">
              <button className="settingsButtons">Tillbaka</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
