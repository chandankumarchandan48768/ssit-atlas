import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = sessionStorage.getItem('token');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/map', label: '3D Map' },
        { path: '/events', label: 'Events' },
        { path: '/lost-found', label: 'Lost & Found' },
    ];

    return (
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                        <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <span className="self-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        SSIT Atlas
                    </span>
                </Link>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all"
                >
                    <span className="sr-only">Open main menu</span>
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                <div className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto transition-all`}>
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 md:bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0 backdrop-blur-lg md:backdrop-blur-none">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block py-2 px-3 rounded md:p-0 transition-all duration-300 relative group ${isActive(link.path)
                                        ? 'text-blue-600 dark:text-blue-500 font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500'
                                        }`}
                                >
                                    {link.label}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}></span>
                                </Link>
                            </li>
                        ))}

                        {token && (
                            <>
                                <li>
                                    <Link
                                        to="/social"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block py-2 px-3 rounded md:p-0 transition-all duration-300 relative group ${isActive('/social')
                                            ? 'text-blue-600 dark:text-blue-500 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500'
                                            }`}
                                    >
                                        Social
                                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left transition-transform duration-300 ${isActive('/social') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`}></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block py-2 px-3 rounded md:p-0 transition-all duration-300 relative group ${isActive('/dashboard')
                                            ? 'text-blue-600 dark:text-blue-500 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500'
                                            }`}
                                    >
                                        Dashboard
                                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left transition-transform duration-300 ${isActive('/dashboard') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`}></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block py-2 px-3 rounded md:p-0 transition-all duration-300 relative group ${isActive('/profile')
                                            ? 'text-blue-600 dark:text-blue-500 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500'
                                            }`}
                                    >
                                        Profile
                                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left transition-transform duration-300 ${isActive('/profile') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`}></span>
                                    </Link>
                                </li>
                            </>
                        )}

                        {token ? (
                            <li>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left py-2 px-3 md:px-4 md:py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-2 px-3 md:px-4 md:py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-2 px-3 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium hover:shadow-lg"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
