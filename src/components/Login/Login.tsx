import { FormEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import "./Login.scss";

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
      setError("Mejl eller lösenord stämmer inte!");
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
      <div className="loginWrapet">
        <div className="loginConatiner">
          <h1>Hej på dig hinksparare!</h1>
          {error}
          <form className="loginForm" onSubmit={handleSubmit}>
            <input
              className="loginInputs"
              required
              type="email"
              id="emailInput"
              placeholder="Mejl"
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <input
              className="loginInputs"
              required
              minLength={6}
              placeholder="lösenord"
              type="password"
              id="passwordInput"
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <Link className="loginLinks" to="/register">
              Ny användare?
            </Link>

            <button
              className="loginSubmitButton"
              disabled={loading}
              type="submit"
            >
              Logga in
            </button>

            <Link className="loginLinks" to="/passwordReset">
              Glömt lösenordet?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
