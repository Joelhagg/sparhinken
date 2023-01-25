import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <>
      <div className="notFoundContainer">
        <h1>404</h1>
        <p>Här finns inga hinkar!</p>
        <Link className="notFoundLink" to="/">
          <h2>Till start 🏆</h2>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
