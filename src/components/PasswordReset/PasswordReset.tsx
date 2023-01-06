const PasswordReset = () => {
  return (
    <>
      <h1>Password reset works!</h1>
      <br />
      <br />
      <form>
        <label>
          Ange mejl
          <br />
          <input type="email" id="email" />
          <br />
          <br />
        </label>
        <label>
          Ange nytt lösennord
          <br />
          <input type="password" id="password" />
          <br />
        </label>
        <label>
          Ange nytt lösenord igen
          <br />
          <input type="password" id="passWord" />
        </label>
        <br />
        <br />
        <button type="submit">Ändra lösenord</button>
      </form>
    </>
  );
};
export default PasswordReset;
