import { Link } from "react-router-dom";
import logoImage from "../assets/chesslogo.png";

function Header() {
  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-black">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logoImage} alt="Company Logo" style={{ width: 50 }} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/map">
                  Map
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendar">
                  Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chart">
                  Chart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
