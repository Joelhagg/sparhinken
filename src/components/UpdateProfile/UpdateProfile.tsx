import { FormEvent, useState } from "react";

const UpdateProfile = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <h1>Update profile works</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ange mejl
          <br />
          <input type="email" id="email" />
          <br />
          <br />
        </label>
        <label>
          Nytt lösenord
          <br />
          <input type="password" id="password" />
          <br />
          <br />
        </label>
        <label>
          Nytt lösenord igen
          <br />
          <input type="passwordConfirm" id="passwordConfirm" />
          <br />
          <br />
        </label>
        <button disabled={loading} type="submit">
          Uppdatera
        </button>
      </form>
    </>
  );
};

export default UpdateProfile;
