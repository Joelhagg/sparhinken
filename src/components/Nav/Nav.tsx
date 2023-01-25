import { Link } from "react-router-dom";
import "./Nav.scss";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { useContext, useState } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Nav() {
  const contextState = useContext(StateContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setError("");

    try {
      setLoading(true);
      await signOut(auth);
      navigate("/login");
    } catch {
      setError("Failed to log out...");
    }
    setLoading(false);
  };

  return (
    <nav className="nav">
      <div className="logoContainer">
        <Link className="logoLink" to="/">
          <h1 className="logo">Sparhinken</h1>
        </Link>
      </div>

      <div className="linksWraper">
        <Link className="navLink" to="/dashboard">
          Dashboard
        </Link>

        <Link className="navLink" to="/about">
          Om oss
        </Link>

        {!contextState.currentUser ? (
          <div className="linkButtonConatiner">
            <Link to="/register">
              <button className="navButton">Ny kund?</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Logga in</button>
            </Link>
          </div>
        ) : (
          <div className="linkButtonConatiner">
            <Link to="/update-profile">
              <button className="navButton">Uppdatera profil</button>
            </Link>

            <form>
              {error}
              <button
                className="navButton"
                disabled={loading}
                onClick={handleLogout}
              >
                Logga ut
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
