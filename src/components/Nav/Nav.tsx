import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav>
      <h1>Nav works!</h1>
      <Link to="/">Hem</Link>
      <br />
      <Link to="/dashboard">Dashboard</Link>
      <br />
      <Link to="/about">Om oss</Link>
      <br />
      <Link to="/settings">Inställningar</Link>
      <br />
      <Link to="/bucket">Hink</Link>
      <br />
      <Link to="/passwordReset">Återställ lösenord</Link>
      <br />
      <br />
      <Link to="/login">
        <button>Logga in</button>
      </Link>
      <br />
      <Link to="/register">
        <button>Registrera dig</button>
      </Link>
      <br />
      <br />
    </nav>
  );
}

export default Nav;
