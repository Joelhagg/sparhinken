import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import "./Register.scss";

import { auth } from "../../firebase";

const Register = () => {
  const contextState = useContext(StateContext);
  const [currentUser, setCurrentUser] = useState(contextState);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (userPassword !== userPasswordConfirmation) {
      return setError("Lösenorden stämmer inte");
    }

    try {
      setError("");
      setLoading(true);
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      navigate("/settings");
    } catch (e) {
      console.error(e);
      setError(
        "Det gick inte att skapa ett konto, adressen kanske är registrerad?"
      );
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
      <div className="registerWrapet">
        <div className="registerConatiner">
          <h1>Bli hinksparare!</h1>
          {error}
          <form className="registerForm" onSubmit={handleSubmit}>
            <input
              className="registerInputs"
              required
              placeholder="Mail"
              type="email"
              id="email"
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <input
              className="registerInputs"
              required
              minLength={6}
              placeholder="Lösenord"
              type="password"
              id="password"
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <input
              className="registerInputs"
              required
              minLength={6}
              type="password"
              placeholder="Ange lösenord igen"
              id="passwordAgain"
              onChange={(e) => setUserPasswordConfirmation(e.target.value)}
            />
            <div className="termsCheckboxContiner">
              <input className="registerCheckbox" required type="checkbox" />
              <Link className="checkboxTextLink" to="/terms" target="_blank">
                Godkänner du våra villkor? 🏆
              </Link>
            </div>

            <button
              className="registerSubmitButton"
              disabled={loading}
              type="submit"
            >
              Skapa ny användare
            </button>

            <p>
              <Link className="loginLinks" to="/login">
                Redan registrerad?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
