import "./navbar.css"
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="nav">
        <Link to="/"> <img src= "logo.png" alt = "csgo-players" className='nav-logo' /> </Link>
        <ul className="nav-items">
          <li>
            <Link to="/" className="nav-item"> Teams </Link>
          </li>
          <li>
            <Link to="/favorites" className="nav-item"> Favorites </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}