import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1>Dashboard works!</h1>
      <Link to="/settings">
        <button>Ändra inställningarna</button>
      </Link>
      <br />
      <br />
      <h4>Totalt sparande: 250 000kr</h4>
      <h4>Månadsutgift: 9 000kr</h4>
      <br />
      <br />
      <Link to="/bucket">
        <button>Skapa en ny hink +</button>
      </Link>
    </>
  );
}
export default Dashboard;
