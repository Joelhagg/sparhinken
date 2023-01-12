import { FormEvent, useContext, useState } from "react";
import { StateContext } from "../../contexts/StateProvider/StateProvider";

const UpdateProfile = () => {
  const contextState = useContext(StateContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
  const [currentUser, setCurrentUser] = useState(contextState);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (userPassword !== userPasswordConfirmation) {
      return setError("Passwords do not match");
    }
  };
  console.log("email: ", currentUser.currentUser.email);
  console.log(contextState);

  return (
    <>
      <h1>Update profile works</h1>
      <br />
      <h3>Du är inloggad som: {currentUser.currentUserEmail}</h3>
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
            type="password"
            id="passwordConfirm"
            onChange={(e) => setUserPasswordConfirmation(e.target.value)}
          />
          <br />
          <br />
        </label>
        <h3>{error}</h3>
        <button disabled={loading} type="submit">
          Uppdatera
        </button>
        <br />
        <br />
        <button>Radera användare</button>
      </form>
    </>
  );
};

export default UpdateProfile;
