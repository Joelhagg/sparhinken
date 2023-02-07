import { sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "./PasswordReset.scss";

const PasswordReset = () => {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSucces, setResetSuccess] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setResetDone(false);
      setError("");
      setLoading(true);
      await sendPasswordResetEmail(auth, userEmail);
      setResetSuccess(true);
      setResetDone(true);
    } catch {
      setError(
        "Kunde inte återställa lösen, kolla att du angivit rätt mejladress"
      );
      setResetSuccess(false);
      setResetDone(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="passwordResetWraper">
        <div className="passwordResetContainer">
          <h1>Återställ lösenord</h1>
          <p className="passwordResetText">
            Ange mejladressen som du har registrerat ett konto med.
          </p>
          {error}
          <form className="passwordResetForm" onSubmit={handlePasswordReset}>
            <input
              placeholder="Mailadress"
              className="passwordResetInput"
              type="email"
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <button
              className="passwordResetButton"
              disabled={loading || resetDone}
              type="submit"
            >
              Återställ lösenord
            </button>

            <div>
              {resetSucces ? (
                <p className="passwordResetText">Kolla din mail</p>
              ) : (
                <p></p>
              )}
            </div>
            <div>
              {resetSucces ? (
                <Link to="/login">
                  <button className="passwordResetButton">Logga in</button>
                </Link>
              ) : (
                <p></p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default PasswordReset;
