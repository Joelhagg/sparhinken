import { Link } from "react-router-dom";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { useContext } from "react";
import bucketImg from "../../assets/buckets.jpg";
import "./Guide.scss";

const Guide = () => {
  // user object for checking if user is logged in
  const contextState = useContext(StateContext);

  return (
    <>
      <div className="guideWrapper" id="guideWrapper">
        <h1>Guiden till Hinkspar!</h1>
        <h3>Översikt</h3>
        <ol>
          <li>
            <a href="#section1">Vad är Sparhinken?</a>
          </li>
          <li>
            <a href="#section2">Varför borde jag använda mig av det här?</a>
          </li>
          <li>
            <a href="#section3">Hur fungerar strategin?</a>
          </li>
          <li>
            <a href="#section4">Hur fungerar appen?</a>
          </li>

          <li>
            <a href="#section5">Hink1</a>
          </li>
          <li>
            <a href="#section6">Hink2</a>
          </li>
          <li>
            <a href="#section7">Hink3</a>
          </li>
          <li>
            <a href="#section8">Hink4</a>
          </li>
        </ol>

        <p>ca 5 min läsning</p>
        <div className="guideContainer">
          <section id="section1">
            <h3>Vad är Sparhinken?</h3>

            <p>
              Sparhinken är ett verktyg för att skapa en översikt av hur ditt
              sparande är placerat. Du kanske har pengar vid flera olika
              tjänster och är lite osäker på hur dom är placerade? Då kan du
              testa att mata in dina belopp i hinkar för att få en överblick av
              ditt sparande.
            </p>

            <p>
              Sparhinken bygger på en enkel sparstrategi där man bygger upp sitt
              sparande i “Hinkar”. Det betyder att man skapar en form av mental
              bokföring för att dela upp sitt sparande i olika riskklasser. Med
              risk menar vi i det här fallet risken att ens pengar kan
              försvinna. Med låg risk menar vi sparkonto med insättningsgaranti,
              ett vanligt konto på banken med ränta, gärna så hög som möjligt!
              Med hög risk menar vi 100% aktiespar vilket kan sjunka i värde
              under en period. Däremellan är rekommendationen att använda sig av
              en fördelning mellan Räntepapper och Aktier för att sänka risken.
            </p>
          </section>

          <section id="section2">
            <h3>Varför borde jag använda mig av det här?</h3>
            <p>
              Enligt SCB:s undersökning klarar inte 1 av 5 svenskar en
              oförutsedd utgift på över 12 000 kr och i lägre åldrar så är det 1
              av 4. 12 000kr kanske verkar som väldigt mycket pengar för en del,
              och beroende på levnadsförhållanden så är det det! Med hjälp av
              tjänsten Sparhinken så kan du skapa en mycket simpel men effektivt
              sparstrategi.
            </p>
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.scb.se/pressmeddelande/en-av-fem-klarar-inte-ovantad-utgift-pa-12-000/"
              >
                SCB:s undersökning
              </a>
            </p>
          </section>

          <section id="section3">
            <h3>Hur fungerar strategin?</h3>
            <p>
              Tänk dig riktiga hinkar, när en hink är full och fortsätts att
              fyllas på så rinner vatten över kanten, som tur är så finns det en
              hink under som fångar upp spillet och börjar fyllas på. När den
              adnra i sin tur är full så spiller det över till den 3:e hinken,
              och den här hinken är speciell, den kan nämligen aldrig bli fylld.
              I den här hinken så får det rum hur mycket vatten som helst. Med
              dom här 3 hinkarna har man en riktigt robust och enkel strategi.
              Skulle man vilja använda strategin till fullo så kan man ta den
              4:e hinken som alltid är 10% av 3:e hinkens storlek. Denna hinken
              kan man ha om man vill “leka lite”. Det vill säga, fylla den med
              lite med riskfyllt innehåll och svämmar den här över så hälls det
              bara tillbaka till den 3:e oändliga hinken. Istället för vatten så
              är det såklart pengar som rinner uppifrån och ned.
            </p>

            <img
              className="bucketImage"
              alt="Visar ett uppritat system för hinksystemet där pilar visar att det rinner till nästa som är under."
              src={bucketImg}
            />
          </section>

          <section id="section4">
            <h3>Hur fungerar appen?</h3>
            <p>
              När du har skapat ett konto och loggat in så kommer du till
              inställningarna, här anger du ditt namn och vad du har för fasta
              månadsutgifter, tex, boendekostnad, sparande, mat, bil, tjänster
              etc. Helt enkelt det du vet att du kommer att betala när du fått
              din lön. När du räknat ut och angivit din fasta månadskostnad och
              sparat inställningarna så kommer du till översikten och här kan du
              skapa din första av maximalt 4 hinkar!
            </p>
          </section>

          <section className="section" id="section5">
            <p>
              <strong>Hink 1</strong>
              <i> Bufferthinken:</i>
              <br />
              <strong>Placeringsförslag:</strong> <i>Sparkonto med ränta.</i>
              <br />
              <strong>Storleksförslag:</strong>
              <i> 3 månaders utgifter.</i>
            </p>
            <p>
              Är tänkt som en bufferthink, det betyder att du ska ha enkel
              tillgång till pengar om det skulle hända något. Tex om du blir
              långtidssjukskriven så kan en buffert hjälpa dig när du går på
              sjukbidrag. En annan händelse kan vara om du bor i hus och något
              händer med huset, tex om värmepumpen går sönder så kan bufferten
              rädda dig. Bufferthinken som vi kallar den är helt enkelt till för
              oförutsedda utgifter där det finns en minimal risk för att
              pengarna ska minska i värde. Är du ung, student, med i a-kassan
              och kan få ett nytt jobb så kanske hinken kan vara lite mindre. Är
              du däremot äldre, bor i hus med större svårigheter att skaffa ett
              nytt jobb och inga besparingar kanske hinken borde vara lite
              större.
            </p>
          </section>

          <section className="section" id="section6">
            <p>
              <strong>Hink 2</strong>
              <i> Mellanriskhinken: </i>
              <br />
              <strong>Placeringsförslag:</strong>{" "}
              <i> 60% Aktier och 40% Räntepapper</i>
              <br />
              <strong>Storleksförslag</strong>
              <i> 5 gånger större än Hink 1</i>
            </p>
            <p>
              Fungerar som stöd för Bufferthinken, man kan tänka att det är som
              en andra buffert men med större chans till tillväxt med relativ
              låg risk. Om bufferten skulle ta slut så fyller man på från den
              här hinken.
            </p>
          </section>

          <section className="section" id="section7">
            <p>
              <strong>Hink3</strong>
              <i> Högriskhinken: </i>
              <br />
              <strong>Placeringsförslag:</strong>
              <i> 100% Aktier</i>
              <br />
              <strong>Storleksförslag:</strong>
              <i> Forstätt att fylla på efter Hink 1 & 2 är fyllda</i>
            </p>
            <p>
              Det här är hinken som är till för att dina pengar får växa över
              tid! Den bör innehålla 100% aktier. När Hink1 och 2 är fyllda så
              spiller alla pengar över i den här. Den har en lång sparhorisont
              och är inte till för skapa säkerhet utan ska utgöra
              avkastningsmotorn i ditt sparande. Skulle de två första hinkarna
              mot förmodan tömmas helt så tar men av den här, men då med risken
              att värdet kan ha gått ned.
            </p>
          </section>

          <section className="section" id="section8">
            <p>
              <strong>Hink4</strong>
              <i> Lekhinken: </i>
              <br />
              <strong>Placeringsförslag:</strong>
              <i>
                {" "}
                Alternativa tillgångar, ädelmetaller, krypto, certifikat, vin,
                konst etc..
              </i>
              <br />
              <strong>Storleksförslag:</strong>
              <i> 10% av Hink 3</i>
            </p>
            <p>
              Den här hinken är precis som det låter, den är till för “lek”. Den
              är tänkt att kunna ge utrymme och utlopp för alternativa
              investeringar med en väldigt hög risk. En rekommendation är att
              hinken inte överstiger 10% av värdet av Högriskhinken för att ge
              en riktlinje. Är man inte intresserad av denna hink så skippar man
              helt enkelt den!
            </p>
          </section>

          <div className="bottomContainer">
            <a className="backUpLink" href="#guideWrapper">
              <h2>Tillbaka upp &uarr;</h2>
            </a>

            <h3>Testa att skapa en hink!</h3>

            {!contextState.currentUser ? (
              <Link to="/register">
                <button className="guideRegisterButton">Registreara dig</button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <button className="guideRegisterButton">
                  Tillbaka till Översikt
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;
