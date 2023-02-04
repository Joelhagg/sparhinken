import { updatePassword } from "firebase/auth";
import { FormEvent, useContext, useState } from "react";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./UpdateProfile.scss";

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
      return setError("Lösenorden är inte lika");
    }

    try {
      setError("");
      if (user) {
        setLoading(true);
        await updatePassword(user, userPassword);
        setUpdateSuccess(true);
        setUpdateDone(true);
      }
    } catch (e) {
      setError("Gick inte att byta lösenord, testa att logga ut och in igen");
      setUpdateSuccess(false);
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="updateProfileWraper">
        <div className="updateProfileConatiner">
          <h1>Uppdatera din profil</h1>
          <h2>Du är inloggad som: {currentUser.currentUser.email}</h2>
          <form className="updateProfileForm" onSubmit={handleSubmit}>
            <p>Nytt lösenord</p>

            <input
              className="updateProfileInput"
              required
              minLength={6}
              type="password"
              id="password"
              placeholder="Ange nytt lösenord"
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <p>Nytt lösenord igen</p>

            <input
              className="updateProfileInput"
              required
              minLength={6}
              type="password"
              id="passwordConfirm"
              placeholder="Ange nytt lösenord igen"
              onChange={(e) => setUserPasswordConfirmation(e.target.value)}
            />

            <h3>{error}</h3>
            <button
              className="updateProfileButton"
              disabled={loading || updateDone}
              type="submit"
            >
              Uppdatera
            </button>
            <br />
            {updateSuccess ? <h2>Uppdateringen lyckades!</h2> : <p></p>}
            {updateDone ? (
              <Link to={"/dashboard"}>
                <button className="updateProfileButton">
                  Tillbaka till hinkarna
                </button>
              </Link>
            ) : (
              <p></p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
