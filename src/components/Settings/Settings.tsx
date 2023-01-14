import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Settings.css";
import { FormEvent, useContext, useEffect, useState } from "react";
import { StateContext } from "../../contexts/StateProvider/StateProvider";

const Settings = () => {
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
      await setDoc(doc(db, "users", currentUser.currentUser.uid), {
        userName: userName,
        totalSavedAmount: totalSavedAmount,
        monthlyExspenses: monthlyExspenses,
      });
      console.log("saved");
      setSavedStatus("Sparat!");
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
        console.log("no document");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <br />
      <h1>Ekonomiska inställningar</h1>
      {savedStatus}
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <label>
          Ditt namn tack!
          <br />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Ange ditt totala sparade kapital
          <br />
          <input
            type="number"
            min={1}
            value={totalSavedAmount}
            onChange={(e) => setTotalSavedAmount(parseInt(e.target.value))}
          />
        </label>
        <br />
        <br />
        <label>
          Ange dina totala utgifter per månad
          <br />
          <input
            required
            type="number"
            min="1"
            value={monthlyExspenses}
            onChange={(e) => setMonthlyExspenses(parseInt(e.target.value))}
          />
        </label>
        <br />
        <br />
        <button type="submit">Spara</button>
      </form>
    </>
  );
};

export default Settings;
