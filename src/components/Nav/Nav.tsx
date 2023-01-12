import { Link } from "react-router-dom";
import "./Nav.css";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { useContext, useState } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Nav() {
  const contextState = useContext(StateContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState();

  const handleLogout = async () => {
    setError("");

    try {
      await signOut(auth);
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <nav>
      <Link to="/">
        <h1>Sparhinken</h1>
      </Link>
      <br />
      <Link to="/dashboard">Dashboard</Link>
      <br />
      <Link to="/about">Om oss</Link>

      <br />
      <br />

      {!contextState.currentUser ? (
        <div>
          <Link to="/login">
            <button>Logga in</button>
          </Link>
          <br />
          <Link to="/register">
            <button>Registrera dig</button>
          </Link>
          <br />
        </div>
      ) : (
        <div>
          <Link to="/update-profile">
            <button>Uppdatera profil</button>
          </Link>
          <br />
          <br />
          <form>
            <button onClick={handleLogout}>Logga ut</button>
          </form>
        </div>
      )}

      <br />
      <br />
    </nav>
  );
}

export default Nav;
