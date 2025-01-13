import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
    const [user, setUser] = useState<{ id: string; email: string } | null>(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);


    const updateUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({
                id: localStorage.getItem('Id') || '',
                email: `${parsedUser.email}`,
            });
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        updateUserFromLocalStorage();

        window.addEventListener('storage', updateUserFromLocalStorage);

        return () => {
            window.removeEventListener('storage', updateUserFromLocalStorage);
        };
    }, []);
    
    return (
        <div>
            <nav className='navbar'>
                <ul className='navbar-list'>
                    <li className='navbar-item'>
                        <Link to='/' className='navbar-link'>
                            <span className='navbar-name'>Home</span>
                        </Link>
                        <Link to='/catalogue' className='navbar-link'>
                            <span className='navbar-name'>Catalogue</span>
                        </Link>
                        <Link to='/about-us' className='navbar-link'>
                            <span className='navbar-name'>About us</span>
                        </Link>
                    </li>
                </ul>
                {user ? (
                    <div className="navbar-links-right">
                        <div
                            className="navbar-link profile"
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        >
                            My Profile
                            {isProfileMenuOpen && (
                                <div className="profile-menu">
                                    <Link to="/orders" className="profile-menu-item">My Orders</Link>
                                    <Link to="/sign-out" className="profile-menu-item">Sign Out</Link>
                                </div>
                            )}
                        </div>
                        <Link to="/cart" className="navbar-link">Cart</Link>
                    </div>
                    ) : (
                    <Link to='/sign-in' className='navbar-link'>
                        <span className='navbar-name'>Sign In</span>
                    </Link>
                    )
                }
            </nav>
        </div>
    );
}

export default NavBar;