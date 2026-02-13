import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [department, setDepartment] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/register', { name, email, password, role, department, phoneNumber });
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 409) {
                setError('Email already registered');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow";

    return (
        <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
            <main className="mt-0 transition-all duration-200 ease-in-out">
                <section className="min-h-screen">
                    <div className="bg-top relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-cover min-h-50-screen rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg')]">
                        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-zinc-800 to-zinc-700 opacity-60"></span>
                        <div className="container z-10">
                            <div className="flex flex-wrap justify-center -mx-3">
                                <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                                    <h1 className="mt-12 mb-2 text-white">Welcome!</h1>
                                    <p className="text-white">Create new account in SSIT Atlas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
                            <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                                <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                                    <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                                        <h5>Register</h5>
                                    </div>
                                    <div className="flex-auto p-6">
                                        {error && (
                                            <div className="p-3 mb-4 text-sm text-white bg-red-500 rounded-lg">
                                                {error}
                                            </div>
                                        )}
                                        <form role="form text-left" onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <input
                                                    type="text"
                                                    className={inputClass}
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="email"
                                                    className={inputClass}
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="password"
                                                    className={inputClass}
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="tel"
                                                    className={inputClass}
                                                    placeholder="Phone Number"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <select
                                                    className={inputClass}
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                >
                                                    <option value="STUDENT">Student</option>
                                                    <option value="FACULTY">Faculty</option>
                                                    <option value="HOD">HOD</option>
                                                    <option value="CULTURAL_COMMITTEE">Cultural Committee</option>
                                                    <option value="MANAGEMENT_TEAM">Management Team</option>
                                                    <option value="PLACEMENT_DEPARTMENT">Placement Department</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <select
                                                    className={inputClass}
                                                    value={department}
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                >
                                                    <option value="">Select Department (Optional)</option>
                                                    <option value="CSE">CSE</option>
                                                    <option value="ISE">ISE</option>
                                                    <option value="ECE">ECE</option>
                                                    <option value="EEE">EEE</option>
                                                    <option value="MECH">MECH</option>
                                                    <option value="CIVIL">CIVIL</option>
                                                </select>
                                            </div>

                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="inline-block w-full px-5 py-2.5 mt-6 mb-2 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-xs leading-normal text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-zinc-800 to-zinc-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Creating Account...' : 'Sign up'}
                                                </button>
                                            </div>
                                            <p className="mt-4 mb-0 leading-normal text-sm text-center">
                                                Already have an account? <Link to="/login" className="font-bold text-slate-700">Sign in</Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Register;
