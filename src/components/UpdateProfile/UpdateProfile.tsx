import { updatePassword } from "firebase/auth";
import { FormEvent, useContext, useState } from "react";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const contextState = useContext(StateContext);
  const [currentUser, setCurrentUser] = useState(contextState);

  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateDone, setUpdateDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (userPassword !== userPasswordConfirmation) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      if (user) {
        setLoading(true);
        await updatePassword(user, userPassword);
        setUpdateSuccess(true);
        setUpdateDone(true);
      }
    } catch {
      setError("Failed to update password, try again");
      setUpdateSuccess(false);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Update profile works</h1>
      <br />
      <h3>Du är inloggad som: {currentUser.currentUser.email}</h3>
      <form onSubmit={handleSubmit}>
        {/* <label>
          Ange mejl
          <br />
          <input type="email" id="email" />
          <br />
          <br />
        </label> */}
        <label>
          Nytt lösenord
          <br />
          <input
            required
            minLength={6}
            type="password"
            id="password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <br />
          <br />
        </label>
        <label>
          Nytt lösenord igen
          <br />
          <input
            required
            minLength={6}
            type="password"
            id="passwordConfirm"
            onChange={(e) => setUserPasswordConfirmation(e.target.value)}
          />
          <br />
          <br />
        </label>
        <h3>{error}</h3>
        <button disabled={loading || updateDone} type="submit">
          Uppdatera
        </button>
        <br />
        {updateSuccess ? <h4>Uppdateringen lyckades!</h4> : <p></p>}
        {updateDone ? (
          <Link to={"/dashboard"}>
            <button>Tillbaka till hinkarna</button>
          </Link>
        ) : (
          <p></p>
        )}
        <br />
        {/* <button>Radera användare</button> */}
      </form>
    </>
  );
};

export default UpdateProfile;
