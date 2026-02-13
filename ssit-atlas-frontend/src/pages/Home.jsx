import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Building2, Navigation, Shield } from 'lucide-react';

const Home = () => {
    const features = [
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "3D Campus Navigation",
            description: "Explore our campus in stunning 3D with real-time pathfinding",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Events & Activities",
            description: "Stay updated with the latest campus events and activities",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Social Network",
            description: "Connect with students, make friends, and build your network",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: <Building2 className="w-8 h-8" />,
            title: "Building Information",
            description: "Access detailed information about every building on campus",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: <Navigation className="w-8 h-8" />,
            title: "Smart Pathfinding",
            description: "Get turn-by-turn directions to any location on campus",
            gradient: "from-indigo-500 to-blue-500"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Lost & Found",
            description: "Report and find lost items across the campus easily",
            gradient: "from-yellow-500 to-orange-500"
        }
    ];

    const stats = [
        { value: "15+", label: "Campus Buildings" },
        { value: "3000+", label: "Active Students" },
        { value: "200+", label: "Faculty Members" },
        { value: "50+", label: "Events/Year" }
    ];

    return (
        <div className="bg-white dark:bg-gray-900 flex-grow overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 animate-gradient">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 py-16 px-4 mx-auto max-w-screen-xl text-center">
                    <div className="animate-fade-in">
                        <h1 className="mb-6 text-5xl font-extrabold tracking-tight leading-none text-white md:text-6xl lg:text-7xl text-shadow-lg">
                            Navigate SSIT Campus
                            <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent">
                                Like Never Before
                            </span>
                        </h1>
                        <p className="mb-8 text-xl font-normal text-white/90 lg:text-2xl sm:px-16 lg:px-48 text-shadow">
                            Explore buildings, find your classrooms, connect with friends, and stay updated with the latest campus events — all in stunning 3D
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <Link
                                to="/map"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-purple-700 bg-white rounded-xl hover:bg-gray-100 focus:ring-4 focus:ring-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                            >
                                Explore 3D Map
                                <svg
                                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </Link>
                            <Link
                                to="/events"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/20 backdrop-blur-lg rounded-xl border-2 border-white/30 hover:bg-white/30 focus:ring-4 focus:ring-white/30 transition-all duration-300 hover:scale-105"
                            >
                                Latest Events
                            </Link>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        {stats.map((stat, index) => (
                            <div key={index} className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-white/80 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            A comprehensive platform designed to enhance your campus experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-800 animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10"></div>
                <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Join thousands of students already using SSIT Atlas to navigate campus life
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <Link
                            to="/register"
                            className="px-8 py-4 text-lg font-bold text-purple-700 bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            Create Account
                        </Link>
                        <Link
                            to="/login"
                            className="px-8 py-4 text-lg font-bold text-white bg-white/20 backdrop-blur-lg rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
