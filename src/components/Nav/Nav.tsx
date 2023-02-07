import { Link } from "react-router-dom";
import "./Nav.scss";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { useContext, useState } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

function Nav() {
  const contextState = useContext(StateContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleLogout = async () => {
    setError("");
    try {
      setLoading(true);
      await signOut(auth);
      setNavbarOpen(false);
      navigate("/login");
    } catch {
      setError("Failed to log out...");
    }
    setLoading(false);
  };

  // Yes, "borrowed"...
  // https://ibaslogic.com/how-to-add-hamburger-menu-in-react/

  // toogles to show the hamburger menu
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <nav className="navContainer">
      <div className="logoContainer">
        <h1>
          <Link onClick={() => closeMenu()} className="logoLink" to="/">
            Sparhinken
          </Link>
        </h1>
      </div>

      <div className="linksWraper">
        <Link className="navLink" to="/dashboard">
          Översikt
        </Link>

        <Link className="navLink" to="/guide">
          Guide
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

        <div className="hamburgerMenuContainer">
          <button className="hamburgerMenuButtonOpen" onClick={handleToggle}>
            {navbarOpen ? (
              <MdClose
                style={{ color: "#fff", width: "40px", height: "40px" }}
              />
            ) : (
              <FiMenu
                style={{ color: "#fff", width: "40px", height: "40px" }}
              />
            )}
          </button>
          <div className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <button className="hamburgerMenuButton" onClick={handleToggle}>
              {navbarOpen ? (
                <MdClose
                  style={{ color: "#fff", width: "40px", height: "40px" }}
                />
              ) : (
                <FiMenu
                  style={{ color: "#fff", width: "40px", height: "40px" }}
                />
              )}
            </button>

            <div className="topHamburgerMenuContainer">
              {!contextState.currentUser ? (
                <div className="hamburgerButtonLinks">
                  <Link to="/register">
                    <button onClick={() => closeMenu()} className="navButton">
                      Ny kund?
                    </button>
                  </Link>
                  <Link to="/login">
                    <button onClick={() => closeMenu()} className="navButton">
                      Logga in
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="hamburgerButtonLinks">
                  <Link to="/update-profile">
                    <button onClick={() => closeMenu()} className="navButton">
                      Uppdatera profil
                    </button>
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

              <Link
                onClick={() => closeMenu()}
                className="topHamburgerMenuLinks"
                to="/dashboard"
              >
                <p>Översikt</p>
              </Link>
              <Link
                onClick={() => closeMenu()}
                className="topHamburgerMenuLinks"
                to="/guide"
              >
                <p>Guide</p>
              </Link>
            </div>

            <div className="bottomHamburgerMenuContainer">
              <Link onClick={() => closeMenu()} to="/about">
                <p className="hamburgerMenuLinks">Om oss</p>
              </Link>

              <Link onClick={() => closeMenu()} to="/contact">
                <p className="hamburgerMenuLinks">Kontakt</p>
              </Link>

              <Link onClick={() => closeMenu()} to="/what-do-we-stand-for">
                <p className="hamburgerMenuLinks">Vad står vi för?</p>
              </Link>

              <Link onClick={() => closeMenu()} to="/terms">
                <p className="hamburgerMenuLinks">Vilkor</p>
              </Link>

              <Link onClick={() => closeMenu()} to="/jobs">
                <p className="hamburgerMenuLinks">lediga jobb</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
