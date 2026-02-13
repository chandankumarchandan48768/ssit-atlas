import { useState } from 'react';
import ArgonSidebar from '../components/argon/ArgonSidebar';
import ArgonNavbar from '../components/argon/ArgonNavbar';

const DashboardLayout = ({ children, pageName }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500 min-h-screen">
            <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>

            <ArgonSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
                <ArgonNavbar pageName={pageName} toggleSidebar={toggleSidebar} />

                <div className="w-full px-6 py-6 mx-auto">
                    {children}

                    <footer className="pt-4">
                        <div className="w-full px-6 mx-auto">
                            <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
                                <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                                    <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
                                        © {new Date().getFullYear()}, made with <i className="fa fa-heart"></i> by
                                        <a href="https://www.creative-tim.com" className="font-semibold text-slate-700 dark:text-white" target="_blank" rel="noreferrer"> SSIT Team </a>
                                        for a better web.
                                    </div>
                                </div>
                                <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
                                    <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
                                        <li className="nav-item">
                                            <a href="#" className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500" target="_blank">About Us</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500" target="_blank">Blog</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-in-out text-slate-500" target="_blank">License</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-990 xl:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default DashboardLayout;
