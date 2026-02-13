import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ArgonSidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-blue-500/13 font-semibold text-slate-700 dark:text-white' : 'font-semibold text-slate-700 dark:text-white';
    };

    return (
        <aside className={`fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-expanded={isOpen}>
            <div className="h-19">
                <i
                    className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden"
                    onClick={toggleSidebar}
                ></i>
                <Link className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700" to="/">
                    <img src="/assets/img/logo-ct-dark.png" className="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8" alt="main_logo" />
                    <img src="/assets/img/logo-ct.png" className="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8" alt="main_logo" />
                    <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">SSIT Atlas</span>
                </Link>
            </div>

            <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

            <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
                <ul className="flex flex-col pl-0 mb-0">
                    <li className="mt-0.5 w-full">
                        <Link className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors ${isActive('/dashboard')}`} to="/dashboard">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                <i className="relative top-0 text-sm leading-normal text-blue-500 ni ni-tv-2"></i>
                            </div>
                            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Dashboard</span>
                        </Link>
                    </li>

                    <li className="mt-0.5 w-full">
                        <Link className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors ${isActive('/profile')}`} to="/profile">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                <i className="relative top-0 text-sm leading-normal text-slate-700 ni ni-single-02"></i>
                            </div>
                            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Profile</span>
                        </Link>
                    </li>

                    <li className="mt-0.5 w-full">
                        <Link className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors ${isActive('/map')}`} to="/map">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-map-big"></i>
                            </div>
                            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Campus Map</span>
                        </Link>
                    </li>

                    <li className="mt-0.5 w-full">
                        <Link className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors ${isActive('/events')}`} to="/events">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                <i className="relative top-0 text-sm leading-normal text-emerald-500 ni ni-calendar-grid-58"></i>
                            </div>
                            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Events</span>
                        </Link>
                    </li>

                    <li className="mt-0.5 w-full">
                        <Link className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors ${isActive('/social')}`} to="/social">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                <i className="relative top-0 text-sm leading-normal text-cyan-500 ni ni-world-2"></i>
                            </div>
                            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Social</span>
                        </Link>
                    </li>

                    <li className="mt-0.5 w-full">
                        <Link className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors ${isActive('/lost-found')}`} to="/lost-found">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                <i className="relative top-0 text-sm leading-normal text-red-600 ni ni-box-2"></i>
                            </div>
                            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Lost & Found</span>
                        </Link>
                    </li>

                    <li className="w-full mt-4">
                        <h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase dark:text-white opacity-60">Account pages</h6>
                    </li>

                    <li className="mt-0.5 w-full">
                        <Link className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors ${isActive('/login')}`} to="/login">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-single-copy-04"></i>
                            </div>
                            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Sign In</span>
                        </Link>
                    </li>

                    <li className="mt-0.5 w-full">
                        <Link className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors ${isActive('/register')}`} to="/register">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                <i className="relative top-0 text-sm leading-normal text-cyan-500 ni ni-collection"></i>
                            </div>
                            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Sign Up</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

ArgonSidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

export default ArgonSidebar;
