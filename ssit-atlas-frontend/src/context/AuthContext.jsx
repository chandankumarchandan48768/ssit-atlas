import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => sessionStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            // Include token from state in case axios interceptor isn't fully updated yet
            const response = await api.get('/auth/me'); 
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            // Optionally clear token if unauthorized
            if (error.response?.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, [token]);

    const login = (newToken) => {
        sessionStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
