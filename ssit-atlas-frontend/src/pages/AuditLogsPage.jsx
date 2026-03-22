import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AuditLogsPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        // Check if current user is ADMIN
        const checkAdminAccess = async () => {
            try {
                const response = await api.get('/auth/me');
                setCurrentUser(response.data);
                
                if (response.data.role !== 'ADMIN') {
                    setUnauthorized(true);
                    setTimeout(() => navigate('/dashboard'), 2000);
                    return;
                }
                
                fetchLogs();
            } catch (error) {
                console.error('Error checking admin access:', error);
                setUnauthorized(true);
                setTimeout(() => navigate('/login'), 2000);
            }
        };

        checkAdminAccess();
    }, [navigate]);

    const fetchLogs = async () => {
        try {
            const response = await api.get('/audit-logs');
            setLogs(response.data);
        } catch (error) {
            console.error("Error fetching logs:", error);
        } finally {
            setLoading(false);
        }
    };

    if (unauthorized) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Only administrators can access this page.</p>
                    <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="text-center mt-10">Loading logs...</div>;
    }

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div className="px-4 mx-auto max-w-screen-xl">
                <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Audit Logs</h2>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Timestamp</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                                <th scope="col" className="px-6 py-3">Performed By</th>
                                <th scope="col" className="px-6 py-3">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No logs found</td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                                        <td className="px-6 py-4">{log.action}</td>
                                        <td className="px-6 py-4">{log.performedBy}</td>
                                        <td className="px-6 py-4">{log.details}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AuditLogsPage;
