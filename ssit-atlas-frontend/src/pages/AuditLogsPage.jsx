import { useState, useEffect } from 'react';
import api from '../api/axios';

const AuditLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
    }, []);

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

    if (loading) return <div className="text-center mt-10">Loading logs...</div>;

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
