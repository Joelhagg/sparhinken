import "./Terms.scss";

const Terms = () => {
  return (
    <>
      <div className="termsContainer">
        <h1>Användarvillkor för sparhinken</h1>
        <h3>Vid kontoregistrering godkänner jag följande:</h3>
        <ul>
          <li>
            Jag godkänner vid användandet av Sparhinken.webb.app att tjänsten
            får spara krypterad data om användaren, då i form av e-mail,
            krypterat lösenord, angivet “nickname” angivna belopp och
            “storleksnivåer” på hinkar.
          </li>
          <br />
          <li>
            Jag godkänner att Sparhinken inte är en finansiell rådgivning och
            ska enbart ses som ett visuellt verktyg för utbildningssyfte.{" "}
          </li>
          <br />
          <li>
            Det som nämns som “rekommendation” är påhittat och saknar grund.
            Beloppstorleken på en skapad hink är bara en riktlinje. Dessa
            riktlinjer har ingen grund för en användares sparstrategi utan är
            satta för att ge en generell riktlinje i syfte för att skapa en
            modell för verktyget.
          </li>
        </ul>
      </div>
    </>
  );
};

export default Terms;
