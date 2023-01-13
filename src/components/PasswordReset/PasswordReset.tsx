import { sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { auth } from "../../firebase";
import "./PasswordReset.css";

const PasswordReset = () => {
  const [userEmail, setUserEmail] = useState("");
  const contextState = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSucces, setResetSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await sendPasswordResetEmail(auth, userEmail);
      setResetSuccess(true);
    } catch {
      setError(
        "Kunde inte återställa lösen, kolla att du angivit rätt mejladress"
      );
      setResetSuccess(false);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Password reset works!</h1>

      <h2>Återställ lösenord</h2>
      <h4>{error}</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Ange mejl
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <br />
          <br />
        </label>
        <button disabled={loading} type="submit">
          Ändra lösenord
        </button>
        <div>{resetSucces ? <p>Kolla din mail</p> : <p></p>}</div>
        <div>
          {resetSucces ? (
            <Link to="/login">
              <button>Logga in</button>
            </Link>
          ) : (
            <p></p>
          )}{" "}
        </div>
      </form>
    </>
  );
};
export default PasswordReset;
