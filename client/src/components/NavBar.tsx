import { Link } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
    return (
        <div>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">
                            <span className="navbar-name">Home</span>
                        </Link>
                        <Link to="/catalog" className="navbar-link">
                            <span className="navbar-name">Catalog</span>
                        </Link>
                        <Link to="/sign-in" className="navbar-link">
                            <span className="navbar-name">Sign In</span>
                        </Link>
                        <Link to="/cart" className="navbar-link">
                            <span className="navbar-name">Cart</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;