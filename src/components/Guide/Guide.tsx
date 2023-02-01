import { Link } from "react-router-dom";
import "./Guide.scss";

const Guide = () => {
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
        <div className="guideContainer" id="section1">
          <h3>Vad är Sparhinken?</h3>

          <p>
            Sparhinken är ett verktyg för att skapa en översikt av hur ditt
            sparande är placerat. Du kanske har pengar vid flera olika tjänster
            och är lite osäker på hur dom är placerade? Då kan du testa att mata
            in dina belopp i hinkar för att få en överblick av ditt sparande.
          </p>

          <p>
            Sparhinken bygger på en enkel sparstrategi där man bygger upp sitt
            sparande i “Hinkar”. Det betyder att man skapar en form av mental
            bokföring för att dela upp sitt sparande i olika riskklasser. Med
            risk menar vi i det här fallet risken att ens pengar kan försvinna.
            Med låg risk menar vi sparkonto med insättningsgaranti, ett vanligt
            konto på banken med ränta, gärna så hög som möjlig! Med hög risk
            menar vi 100% aktiespar vilket kan sjunka i värde under en period.
            Däremellan är rekommendationen att använda sig av en fördelning
            mellan Räntepapper och Aktier för att sänka risken.
          </p>

          <h3 id="section2">Varför borde jag använda mig av det här?</h3>
          <p>
            Enligt SCB:s undersökning klarar inte 1 av 5 medelsvensken en
            oförutsedd utgift på över 12 000 kr och i lägre åldrar så är det 1
            av 4. 12 000kr kanske verkar som väldigt mycket pengar för en del,
            och beroende på levnadsförhållanden så är det det! Med hjälp av
            tjänsten Sparhinken så kan du skapa en mycket simpelt men effektivt
            sparstrategi.
          </p>
          <p>
            <a
              target="_blank"
              href="https://www.scb.se/pressmeddelande/en-av-fem-klarar-inte-ovantad-utgift-pa-12-000/"
            >
              SCB:s undersökning
            </a>
          </p>

          <h3 id="section3">Hur fungerar strategin?</h3>
          <p>
            Tänk dig riktiga hinkar, när en hink är full och fortsätts att
            fyllas på så rinner vatten över kanten, som tur är så finns det en
            hink under som fångar upp spillet och börjar fyllas på. När i sin
            tur den andra hinken är full så spiller det över till den 3:e
            hinken, den här hinken är speciell, den kan nämligen aldrig bli
            fylld, i den här så får det rum hur mycket vatten som helst. Med dom
            här 3 hinkarna har man en riktigt robust och enkelt strategi. Skulle
            man vilja använda strategin till fullo så kan man ta den 4:e hinken
            som alltid är 10% av 3:e hinkens storlek. Denna kan man ha om man
            vill “leka lite” det vill säga, fylla den med lite med riskfyllt
            innehåll, svämmar den här över så hälls det bara tillbaka till den
            3:e oändliga hinken. Istället för vatten så är det såklart pengar
            som rinner uppifrån och ned 😉
          </p>

          <h3 id="section4">Hur fungerar appen?</h3>
          <p>
            När du har skapat ett konto och loggat in så kommer du till
            inställningarna, här anger du ditt namn och vad du har för fasta
            månadsutgifter, tex, boendekostnad, sparande, mat, bil, tjänster
            etc. Helt enkelt det du vet att du kommer att betala när du fått din
            lön. När du räknat ut och angivit din fasta månadskostnad och sparat
            inställningarna så kommer du till dashboarden, här kan du skapa din
            första hink!
          </p>
          <p id="section5">
            <strong>Hink1</strong>
            <i> Bufferthinken:</i> Är tänkt som en bufferthink, det betyder att
            du ska ha enkel tillgång till pengar om det skulle hända något, tex
            om du blir långtidssjukskriven kan en buffert hjälpa dig när du går
            på sjukbidrag. En annan händelse kan vara om du bor i hus och något
            händer med huset, tex om värmepumpen går sönder så kan bufferten
            rädda dig. Bufferthinken som vi kallar den är helt enkelt till för
            oförutsedda utgifter där det finns en minimal risk för att pengarna
            ska minska i värde.
          </p>

          <p id="section6">
            <strong>Hink2</strong>
            <i> Mellanriskhinken: </i>
            Fungerar som stöd för Bufferthinken, man kan tänka att det är som en
            andra buffert men med större chans till tillväxt då den bör
            innehålla en fördelning av aktier och räntor, en rekommendation är
            ca 60% aktier och 40% räntor vilket verkar ge en okej avkastning med
            en relativ låg risk.Varför vill man hålla nere risken? Jo för att
            det är tänk som en extra bufferthink fast större men med chans för
            tillväxt, om bufferten skulle ta slut så fyller man på den med den
            här hinken helt enkelt.
          </p>

          <p id="section7">
            <strong>Hink3</strong>
            <i> Högriskhinken: </i>
            Här är hinken som är till för att dina pengar får växa över tid! Den
            bör innehålla 100% aktier. När Hink1 och 2 är fyllda så spiller alla
            pengar över i den här, Den har en lång sparhorisont och är inte till
            för skapa säkerhet utan ska utgöra avkastningsmotorn i ditt
            sparande. Skulle mot förmodan dom 2 första hinkarna tömmas helt så
            tar men av den här, men då med risken att värdet kan ha gått ned.
          </p>

          <p id="section8">
            <strong>Hink4</strong>
            <i> Lekhinken: </i>
            Det är precis som det låter, hinken som är till för just “lek”. Den
            är tänkt att kunna ge utrymme för utlopp av ett möjligen intresse av
            alternativa investeringar, tex aktiespekulationer, krypto,
            certifikat eller liknande, sådant som är väldigt hög risk. En
            rekommendation är att hinken inte överstiger 10% av värdet av
            Högriskhinken för att ge en riktlinje. Är man inte intresserad av
            denna hink så skippar man helt enkelt den!
          </p>

          <a href="#guideWrapper">
            <h2>Tillbaka upp &uarr;</h2>
          </a>

          <h3>Testa att skapa en hink nu!</h3>

          <Link to="/register">
            <button className="guideRegisterButton">Registreara dig</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Guide;
