import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footerConatiner">
        <div className="linkConatiner">
          <p className="link">Om oss</p>
          <p className="link">Kontakt</p>
          <p className="link">Vad står vi för?</p>
          <p className="link">Vilkor</p>
          <p className="link">lediga jobb</p>
        </div>

        <div className="socialMediaContainer">
          <p className="link">Facebook</p>
          <p className="link">Instagram</p>
          <p className="link">Linkedin</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
