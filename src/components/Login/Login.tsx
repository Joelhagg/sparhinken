import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [userEmail, setUserEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(userEmail);
  };

  return (
    <>
      <h1>Login Works!</h1>
      <br />
      <form onSubmit={onSubmit}>
        <label>
          Mejl:
          <input
            type="email"
            id="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Lösenord:
          <input type="password" id="password" />
        </label>
        <br />
        <Link to="/passwordReset">Glömt lösenordet?</Link>
        <br />
        <br />
        <button type="submit">Logga in</button>
        <br />
        <br />
        <Link to="/register">Ny användare?</Link>
      </form>
    </>
  );
}
export default Login;
