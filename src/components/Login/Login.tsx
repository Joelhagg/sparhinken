import { FormEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import "./Login.css";

const Login = () => {
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
      setError("Det gick inte att logga in, testa igen!");
      setLoading(false);
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
      <h3>{error}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Mejl:
          <input
            required
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
            required
            minLength={6}
            type="password"
            id="passwordInput"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <Link to="/passwordReset">Glömt lösenordet?</Link>
        <br />
        <br />
        <button disabled={loading} type="submit">
          Logga in
        </button>
        <br />
        <br />
        <Link to="/register">Ny användare?</Link>
      </form>
    </>
  );
};
export default Login;
