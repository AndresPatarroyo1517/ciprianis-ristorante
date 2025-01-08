import '../../assets/css/style.css'
import '../../assets/css/bootstrap.css'
import './header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth'
import { useState } from 'react'
import { ProfilePanel } from '../profilePanel/ProfilePanel'

export function Header() {
    const { handleLogout, isLogged } = useAuth()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [navbarOpen, setNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    }

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    const handleLogoutButton = async () => {
        await handleLogout()
    }

    return (
        <header>
            <div className="contenedor-navbar">
                <nav className="navbar navbar-expand-lg custom_nav-container">
                    <Link to="/" className="navbar-brand"><span>Ciprianis</span></Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleNavbar} 
                        aria-controls="navbarSupportedContent"
                        aria-expanded={navbarOpen ? 'true' : 'false'} 
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                    </button>

                    <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto navbar-ul-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Inicio <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/menu" className="nav-link">
                                    Menú
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/info" className="nav-link">
                                    Información
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/book" className="nav-link">
                                    Reservación
                                </Link>
                            </li>
                        </ul>
                        <div className="user_option">
                            {isLogged && (
                                <div className="userProfileWrapper">
                                    <Link to="#" className="user_link" onClick={toggleProfile}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                    </Link>
                                    {isProfileOpen && (
                                        <div className="profileDropdown">
                                            <ProfilePanel onClose={() => setIsProfileOpen(false)} />
                                        </div>
                                    )}
                                </div>
                            )}
                            <Link to={'/mycart'} className="cart_link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                            </Link>

                            {isLogged ? (
                                <button className="order_online" onClick={handleLogoutButton}>
                                    Cerrar Sesión
                                </button>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button className="order_online">
                                            Iniciar Sesión
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}