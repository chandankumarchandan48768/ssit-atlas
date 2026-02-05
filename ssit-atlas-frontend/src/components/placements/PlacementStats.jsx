import { useState, useEffect } from 'react';
import api from '../../api/axios';

const PlacementStats = ({ academicYear = '2024-25' }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/placements/stats/${academicYear}`);
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching placement stats:", error);
            // Fallback for demo/dev if endpoint isn't ready or returns specific format
            setStats({
                totalPlaced: 0,
                averagePackage: 0,
                highestPackage: 0,
                companyCount: 0
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [academicYear]);

    if (loading) return <div>Loading stats...</div>;

    if (!stats) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Placed" value={stats.totalPlaced || 0} color="blue" />
            <StatCard title="Avg Package" value={`${stats.averagePackage || 0} LPA`} color="green" />
            <StatCard title="Highest Package" value={`${stats.highestPackage || 0} LPA`} color="purple" />
            <StatCard title="Companies Visited" value={stats.companyCount || 0} color="orange" />
        </div>
    );
};

const StatCard = ({ title, value, color }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
        green: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300',
        purple: 'bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
        orange: 'bg-orange-50 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
    };

    return (
        <div className={`p-4 rounded-lg shadow-sm ${colorClasses[color]}`}>
            <p className="text-xs font-semibold uppercase opacity-70">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
};

export default PlacementStats;
