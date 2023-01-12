import { FormEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import "./Login.css";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const contextState = useContext(StateContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      navigate("/dashboard");
    } catch {
      setError("Failed to login");
    }
  };

  useEffect(() => {
    if (contextState.currentUser) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <h1>Login Works!</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Mejl:
          <input
            type="email"
            id="emailInput"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Lösenord:
          <input
            type="password"
            id="passwordInput"
            onChange={(e) => setUserPassword(e.target.value)}
          />
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
