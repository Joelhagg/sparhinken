import { FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Bucket.css";

const Bucket = () => {
  const saveBucket = (e: FormEvent) => {
    e.preventDefault();
    console.log("bucket saved");
  };

  const deleteBucket = (e: FormEvent) => {
    e.preventDefault();
    console.log("delete bucket");
  };

  return (
    <>
      <form>
        <h1>Hink 1</h1>
        <label>
          Namnge din hink
          <br />
          <input type="text" placeholder="Bufferthink" />
        </label>
        <br />
        <br />
        <label>
          Rekommenderad storlek:
          <br />
          <input type="number" placeholder="27 000 kr" />
        </label>
        <br />
        <br />
        <label>
          Vald storlek
          <br />
          <input type="number" placeholder="27 000 kr" />
        </label>
        <br />
        <br />
        <label>
          Risknivå
          <br />
          <input type="range" min="0" max="2" />
        </label>
        <br />
        <br />
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
        <button onClick={deleteBucket}>Radera</button>
      </form>
    </>
  );
};
export default Bucket;
