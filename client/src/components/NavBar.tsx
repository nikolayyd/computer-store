import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
    const [user, setUser] = useState<{ id: string; username: string } | null>(null);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
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
                        <Link to="/about-us" className="navbar-link">
                            <span className="navbar-name">About us</span>
                        </Link>
                    </li>
                </ul>
                {user ? (
                    <Link to="/cart" className="navbar-link">
                        <span className="navbar-name">Cart</span>
                    </Link>
                    ) : (
                    <Link to="/sign-in" className="navbar-link">
                        <span className="navbar-name">Sign In</span>
                    </Link>
                    )
                }
            </nav>
        </div>
    );
}

export default NavBar;