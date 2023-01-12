import "./Bucket.css";

const Bucket = () => {
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
        <button>Spara</button>
        <br />
        <br />
        <button>Avbryt</button>
        <br />
        <br />
        <button>Radera</button>
      </form>
    </>
  );
};
export default Bucket;
