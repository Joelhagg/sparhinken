function Register() {
  return (
    <>
      <h1>Register works!</h1>
      <form>
        <label>
          Namn
          <br />
          <input type="text" id="firstName" />
        </label>
        <br />
        <br />
        <label>
          Efternamn
          <br />
          <input type="text" id="lastName" />
        </label>
        <br />
        <br />
        <label>
          Mejl
          <br />
          <input type="email" id="email" />
        </label>
        <br />
        <br />
        <label>
          Lösenord
          <br />
          <input type="password" id="password" />
        </label>
        <br />
        <br />
        <label>
          Ange lösenord igen
          <br />
          <input type="password" id="passwordAgain" />
        </label>
        <br />
        <br />
        <label>
          Godkänner du kraven?
          <input type="checkbox" />
        </label>
        <br />
        <br />
        <button type="submit">Skapa ny användare</button>
      </form>
    </>
  );
}
export default Register;
