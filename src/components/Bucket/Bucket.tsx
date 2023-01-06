function Bucket() {
  return (
    <>
      <h1>Bucket works!</h1>
      <label>
        Namnge din hink
        <br />
        <input type="text" />
      </label>
      <br />
      <br />
      <label>
        Rekommenderad storlek: 250 000kr
        <br />
        <input type="number" />
      </label>
      <br />
      <br />
      <label>
        Risknivå
        <br />
        <input type="range" />
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
    </>
  );
}
export default Bucket;
