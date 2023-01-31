import { useEffect, useState } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

// Yes i found this on the internet and stole it!
// How could i not, such nice work Julia! Thanks!
// bionicjulia.com/blog/creating-react-component-fades-changing-words

const FADE_INTERVAL_MS: number = 1500;
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 2;
const WORDS_TO_ANIMATE = [
  "Sparhinken",
  "Sugen på att börja spara?",
  "Det är aldrig för sent att komma igång!",
  "Med en strategi ökar du chansen till att spara regelbundet",
  "Du behöver inte spara mycket om du inte kan!",
  "Det är bättre att spara lite än inget alls!",
];

type FadeProp = { fade: "fade-in" | "fade-out" };

const Home = () => {
  const [fadeProp, setFadeProp] = useState<FadeProp>({ fade: "fade-in" });
  const [wordOrder, setWordOrder] = useState(0);

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fadeProp.fade === "fade-in"
        ? setFadeProp({ fade: "fade-out" })
        : setFadeProp({ fade: "fade-in" });
    }, FADE_INTERVAL_MS);

    return () => clearInterval(fadeTimeout);
  }, [fadeProp]);

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
      <div className="homeContainer">
        <div className="quoteConatiner">
          <h1 className={fadeProp.fade}>{WORDS_TO_ANIMATE[wordOrder]}</h1>
        </div>
        <div className="linkContainer">
          <Link className="homeGuideLink" to="/guide">
            <h2>Vad är Sparhinken?</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
