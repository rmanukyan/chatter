import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faUser,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
function Navbar(props) {
  return (
    <header>
      <nav
        id="main-navbar"
        className="navbar navbar-expand-lg navbar-light bg-white"
      >
        <div className="container-fluid">
          <h4>Welcome, {props.name}!!</h4>

          <ul className="navbar-nav ms-auto d-flex flex-row">
            <li className="nav-item  mx-3">
              <Link to="/lobby">
                {" "}
                <FontAwesomeIcon icon={faCommentDots} />
              </Link>
            </li>
            <li className="nav-item  mx-3">
              <Link to="/profile">
                {" "}
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
            <li className="nav-item  mx-3">
              <Link
                to="/login"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                {" "}
                <FontAwesomeIcon icon={faSignOut} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
