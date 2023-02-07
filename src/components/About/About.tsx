import "./About.scss";

const About = () => {
  return (
    <>
      <div className="aboutWraper">
        <div className="aboutConatiner">
          <h1>Om Sparhinken</h1>
          <br />
          <p>
            Här kan du läsa allt om sparstrategin som vi väljer att kalla
            "Hink-strategin".
          </p>
          <p>
            Detta är ett examensarbete för kursen Front-end developer FED21d på
            skolan Medieinstitutet.
          </p>
          <p>Insperation och ide tagen ifrån RikaTillsammans.</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://rikatillsammans.se/fyra-hinkar/"
          >
            https://rikatillsammans.se/fyra-hinkar/
          </a>
          <p>
            <i>Tack Jan och Caroline från RikaTillsammans</i>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
