import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email.trim() || !password.trim()) {
            setError('Please enter email and password');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/auth/login', { email, password });
            const token = response.data.token || response.data.accessToken;

            if (!token) {
                setError('No token received from server');
                return;
            }

            sessionStorage.setItem('token', token);
            navigate('/dashboard');
            window.location.reload();
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 401) {
                setError('Invalid email or password');
            } else if (err.message === 'Network Error') {
                setError('Cannot connect to server. Make sure the backend is running.');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
            <main className="mt-0 transition-all duration-200 ease-in-out">
                <section>
                    <div className="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
                        <div className="container z-1">
                            <div className="flex flex-wrap -mx-3">
                                <div className="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                                    <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 dark:bg-gray-950 rounded-2xl bg-clip-border">
                                        <div className="p-6 pb-0 mb-0">
                                            <h4 className="font-bold">Sign In</h4>
                                            <p className="mb-0">Enter your email and password to sign in</p>
                                        </div>
                                        <div className="flex-auto p-6">
                                            {error && (
                                                <div className="p-4 mb-4 text-sm text-white bg-red-500 rounded-lg">
                                                    {error}
                                                </div>
                                            )}
                                            <form role="form" onSubmit={handleSubmit}>
                                                <div className="mb-4">
                                                    <input
                                                        type="email"
                                                        placeholder="Email"
                                                        className="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="password"
                                                        placeholder="Password"
                                                        className="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <button
                                                        type="submit"
                                                        className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all bg-blue-500 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-blue-500 to-violet-500"
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Signing in...' : 'Sign in'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 text-center pt-0 px-1 sm:px-6">
                                            <p className="mx-auto mb-6 leading-normal text-sm">Don't have an account? <Link to="/register" className="font-bold text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500">Sign up</Link></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
                                    <div className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')]">
                                        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-blue-500 to-violet-500 opacity-60"></span>
                                        <h4 className="z-20 mt-12 font-bold text-white">"Attention is the new currency"</h4>
                                        <p className="z-20 text-white ">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
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

export default Login;
