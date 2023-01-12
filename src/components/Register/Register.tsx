import { FormEvent, useContext, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StateContext } from "../../contexts/StateProvider/StateProvider";

import { auth } from "../../firebase";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const contextState = useContext(StateContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (userPassword !== userPasswordConfirmation) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      navigate("/settings");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (contextState.currentUser) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <h1>Register works!</h1>
      <h2>{error}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Mejl
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Lösenord
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Ange lösenord igen
          <br />
          <input
            type="password"
            id="passwordAgain"
            onChange={(e) => setUserPasswordConfirmation(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Godkänner du kraven?
          <input type="checkbox" />
        </label>
        <br />
        <br />
        <button disabled={loading} type="submit">
          Skapa ny användare
        </button>
        <br />
        <br />
        <label>
          Är du redan en användare?
          <br />
          <Link to="/login">
            <button>Logga in</button>
          </Link>
        </label>
      </form>
    </>
  );
};
export default Register;
