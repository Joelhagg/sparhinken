import { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../contexts/StateProvider/StateProvider";

function Dashboard() {
  const contextState = useContext(StateContext);

  return (
    <>
      <h1>Dashboard works!</h1>
      <Link to="/settings">
        <button>Ändra inställningarna</button>
      </Link>
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
