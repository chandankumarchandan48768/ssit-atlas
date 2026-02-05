import { useState, useEffect } from 'react';
import api from '../../api/axios';

const PlacementList = ({ department, academicYear = '2024-25' }) => {
    const [placements, setPlacements] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPlacements = async () => {
        try {
            setLoading(true);
            let url = `/placements/year/${academicYear}`;
            if (department) {
                url = `/placements/department/${department}`;
            }

            const response = await api.get(url);
            setPlacements(response.data);
        } catch (error) {
            console.error("Error fetching placements:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlacements();
    }, [department, academicYear]);

    if (loading) return <div className="text-center py-4">Loading placements...</div>;

    if (placements.length === 0) {
        return <div className="text-center py-8 text-gray-500">No placements found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {placements.map((record) => (
                <div key={record.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700 p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mb-3 overflow-hidden">
                        {/* Placeholder for student photo */}
                        <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{record.studentName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{record.studentUsn}</p>
                    <div className="my-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {record.companyName}
                    </div>
                    <p className="font-bold text-green-600">{record.packageAmount} LPA</p>
                    <p className="text-xs text-gray-400 mt-2">{record.jobRole}</p>
                </div>
            ))}
        </div>
    );
};

export default PlacementList;
