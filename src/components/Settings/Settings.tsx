import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Settings.css";
import { FormEvent, useState } from "react";

const Settings = () => {
  const [userName, setUserName] = useState("John Doe");
  const [totalSavedAmount, setTotalSavedAmount] = useState<number>(0);
  const [monthlyExspenses, setMonthlyExspenses] = useState<number>(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
    } catch {}
  };
  return (
    <>
      <br />
      <h1>Ekonomiska inställningar</h1>
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
            type="number"
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
