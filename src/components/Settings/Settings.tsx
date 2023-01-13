import { Link } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  return (
    <>
      <br />
      <h1>Ekonomiska inställningar</h1>
      <br />
      <label>
        Ange ditt totala sparade kapital
        <br />
        <input type="number" />
      </label>
      <br />
      <br />
      <label>
        Ange dina totala utgifter per månad
        <br />
        <input type="number" />
      </label>
      <br />
      <br />
      <Link to="/dashboard">
        <button>Spara</button>
      </Link>
    </>
  );
};

export default Settings;
