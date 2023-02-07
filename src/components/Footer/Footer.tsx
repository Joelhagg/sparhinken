import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footerConatiner">
        <div className="linkConatiner">
          <Link className="link" to="/about">
            <p>Om oss</p>
          </Link>

          <Link className="link" to="/contact">
            <p>Kontakt</p>
          </Link>

          <Link className="link" to="/what-do-we-stand-for">
            <p>Vad står vi för?</p>
          </Link>

          <Link className="link" to="/terms">
            <p>Vilkor</p>
          </Link>

          <Link className="link" to="/jobs">
            <p>Lediga jobb</p>
          </Link>
        </div>

        <div className="socialMediaLinksContainer">
          <Link className="link" to="/facebook">
            <p>Facebook</p>
          </Link>

          <Link className="link" to="/instagram">
            <p>Instagram</p>
          </Link>

          <Link className="link" to="linkedin">
            <p>Linkedin</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
