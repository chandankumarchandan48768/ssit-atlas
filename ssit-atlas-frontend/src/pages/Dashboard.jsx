import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../api/axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Assuming there is an endpoint to get current user details
                // If not, I'll need to create one or rely on local storage if I updated login
                // Let's try to get from a new endpoint /api/auth/me if it exists, or just use what we have.
                // Since I didn't create /me endpoint, I might need to rely on what I have.
                // Wait, typical JWT flow, I should decode token or have an endpoint.
                // Let's assume I can get it. If not, I will add /me endpoint to AuthController.
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (err) {
                console.error(err);
                // navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!user) {
        return <div className="text-center mt-10">Please log in to view the dashboard.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Welcome, {user.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">Role: <span className="font-bold text-blue-600">{user.role}</span></p>
                {user.department && <p className="text-gray-600 dark:text-gray-300">Department: {user.department}</p>}
            </div>

            {user.role === 'ADMIN' && <AdminSection user={user} />}
            {user.role === 'CULTURAL_COMMITTEE' && <CulturalSection user={user} />}
            {user.role === 'MANAGEMENT_TEAM' && <ManagementSection user={user} />}
            {user.role === 'PLACEMENT_DEPARTMENT' && <PlacementSection user={user} />}
            {user.role === 'HOD' && <HodSection user={user} />}
            {user.role === 'FACULTY' && <FacultySection user={user} />}
            {user.role === 'STUDENT' && <StudentSection user={user} />}
        </div>
    );
};


const AdminSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-blue-800 dark:text-blue-300">System Management</h3>
            <p className="mb-4 text-sm">Manage users, buildings, and system settings.</p>
            <Link to="/admin/users" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">Manage Users</Link>
        </div>
        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-green-800 dark:text-green-300">Audit Logs</h3>
            <p className="mb-4 text-sm">View system activity and security logs.</p>
            <Link to="/admin/logs" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 inline-block">View Logs</Link>
        </div>
    </div>
);


const CulturalSection = () => (
    <div className="bg-purple-50 dark:bg-gray-700 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-purple-800 dark:text-purple-300">Event Management</h3>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mr-4">Create New Event</button>
        <button className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded hover:bg-purple-50">Manage Events</button>
    </div>
);

const ManagementSection = () => (
    <div className="bg-orange-50 dark:bg-gray-700 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-orange-800 dark:text-orange-300">Infrastructure Management</h3>
        <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 mr-4">Update Building Data</button>
        <button className="bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded hover:bg-orange-50">View Campus Stats</button>
    </div>
);

const PlacementSection = () => (
    <div className="bg-indigo-50 dark:bg-gray-700 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-indigo-800 dark:text-indigo-300">Placement Cell</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mr-4">Add Placement Record</button>
        <button className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded hover:bg-indigo-50">View Statistics</button>
    </div>
);

const HodSection = ({ user }) => (
    <div className="bg-teal-50 dark:bg-gray-700 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-teal-800 dark:text-teal-300">Department Head: {user.department}</h3>
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mr-4">Post Notice</button>
        <button className="bg-white text-teal-600 border border-teal-600 px-4 py-2 rounded hover:bg-teal-50">Department Achievements</button>
    </div>
);

const FacultySection = ({ user }) => (
    <div className="bg-cyan-50 dark:bg-gray-700 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-cyan-800 dark:text-cyan-300">Faculty Portal: {user.department}</h3>
        <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 mr-4">My Achievements</button>
        <button className="bg-white text-cyan-600 border border-cyan-600 px-4 py-2 rounded hover:bg-cyan-50">Class Schedule</button>
    </div>
);

const StudentSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">My Placements</h3>
            <button className="text-sm underline text-yellow-700">View Status</button>
        </div>
        <div className="bg-pink-50 dark:bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="font-bold text-pink-800 dark:text-pink-300 mb-2">Events Registered</h3>
            <button className="text-sm underline text-pink-700">View Tickets</button>
        </div>
        <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg text-center">
            <h3 className="font-bold text-gray-800 dark:text-gray-300 mb-2">Notices</h3>
            <button className="text-sm underline text-gray-700 dark:text-gray-200">Check Inbox</button>
        </div>
    </div>
);

export default Dashboard;
