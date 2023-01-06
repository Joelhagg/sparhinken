import { Link } from "react-router-dom";

function Settings() {
  return (
    <>
      <h1>Settings works!!!</h1>
      <br />
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
}

export default Settings;
