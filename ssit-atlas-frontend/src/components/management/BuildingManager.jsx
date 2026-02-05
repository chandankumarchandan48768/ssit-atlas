import { useState, useEffect } from 'react';
import api from '../../api/axios';

const BuildingManager = ({ onClose }) => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBuildings = async () => {
        try {
            setLoading(true);
            // Assuming there is an endpoint to get all buildings. 
            // The existing MapPage likely uses one. Let's guess /buildings or /map/buildings
            // Checking backend controller... usually /api/buildings
            const response = await api.get('/buildings');
            setBuildings(response.data);
        } catch (error) {
            console.error("Error fetching buildings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuildings();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Campus Infrastructure</h2>

            {loading ? (
                <div>Loading buildings...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Floors</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {buildings.map((building) => (
                                <tr key={building.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{building.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{building.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{building.floors?.length || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                                        Edit Details
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-4 text-right">
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                    Add New Building
                </button>
            </div>
        </div>
    );
};

export default BuildingManager;
