import { useEffect, useState } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

// Yes i found this on the internet and stole it!
// How could i not, such nice work Julia! Thanks!
// https://bionicjulia.com/blog/creating-react-component-fades-changing-words

const FADE_INTERVAL_MS: number = 2000;
const WORD_CHANGE_INTERVAL_MS: number = FADE_INTERVAL_MS * 2;
const WORDS_TO_ANIMATE = [
  "Det är aldrig för sent för att komma igång!",
  "Sugen på att börja spara?",
  "Med en strategi ökar du chansen till att lyckas med ditt sparande",
  "Du behöver inte spara mycket om du inte kan!",
  "Det är bättre att spara lite än inget alls!",
  "Sparande är den enda säkerheten vi har för en oviss framtid.",
];

type FadeProp = { fade: "fade-in" | "fade-out" };

const Home = () => {
  const [fadeProp, setFadeProp] = useState<FadeProp>({ fade: "fade-in" });
  const [wordOrder, setWordOrder] = useState<number>(0);

  // timer for animations
  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fadeProp.fade === "fade-in"
        ? setFadeProp({ fade: "fade-out" })
        : setFadeProp({ fade: "fade-in" });
    }, FADE_INTERVAL_MS);

    return () => clearInterval(fadeTimeout);
  }, [fadeProp]);

  // timer for quote change
  useEffect(() => {
    const wordTimeout = setInterval(() => {
      setWordOrder(
        (prevWordOrder) => (prevWordOrder + 1) % WORDS_TO_ANIMATE.length
      );
    }, WORD_CHANGE_INTERVAL_MS);

    return () => clearInterval(wordTimeout);
  }, []);

  return (
    <>
      <div
        role="img"
        aria-label="background image of plant growing out of coins"
        className="homeContainer"
      >
        <div>
          <div className="quoteConatiner">
            <h1 className={fadeProp.fade}>{WORDS_TO_ANIMATE[wordOrder]}</h1>
          </div>
          <div className="linkContainer">
            <h2>
              <Link className="homeGuideLink" to="/guide">
                Vad är Sparhinken?
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
