import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/argon/StatCard';
import CreateNotice from '../components/notices/CreateNotice';
import NoticeList from '../components/notices/NoticeList';
import PlacementStats from '../components/placements/PlacementStats';
import AddPlacementRecord from '../components/placements/AddPlacementRecord';
import PlacementList from '../components/placements/PlacementList';
import CreateEvent from '../components/events/CreateEvent';
import BuildingManager from '../components/management/BuildingManager';
import { getCompletionStatus } from '../api/profileApi';

import api from '../api/axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileComplete, setProfileComplete] = useState(true);
    const [showProfilePrompt, setShowProfilePrompt] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);

                try {
                    const completionStatus = await getCompletionStatus();
                    setProfileComplete(completionStatus.isComplete);
                    setShowProfilePrompt(!completionStatus.isComplete);
                } catch (err) {
                    console.error('Failed to check profile completion:', err);
                }
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
        <DashboardLayout pageName="Dashboard">
            {/* Stat Cards Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
                <StatCard
                    title="Welcome"
                    value={user.name}
                    percentage={user.role}
                    percentageColor="text-emerald-500"
                    percentageLabel="Role"
                    icon="ni ni-circle-08"
                    iconBg="bg-gradient-to-tl from-blue-500 to-violet-500"
                />

                <StatCard
                    title="Department"
                    value={user.department || 'N/A'}
                    icon="ni ni-building"
                    iconBg="bg-gradient-to-tl from-red-600 to-orange-600"
                />

                <StatCard
                    title="Profile Status"
                    value={profileComplete ? "Complete" : "Incomplete"}
                    percentage={profileComplete ? "100%" : "Pending"}
                    percentageColor={profileComplete ? "text-emerald-500" : "text-red-500"}
                    icon="ni ni-single-02"
                    iconBg="bg-gradient-to-tl from-emerald-500 to-teal-400"
                />

                <StatCard
                    title="Notifications"
                    value="3 New"
                    percentage="+1"
                    percentageLabel="since yesterday"
                    percentageColor="text-emerald-500"
                    icon="ni ni-bell-55"
                    iconBg="bg-gradient-to-tl from-orange-500 to-yellow-500"
                />
            </div>

            {/* Profile Prompt */}
            {showProfilePrompt && (
                <div className="w-full mb-6">
                    <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border border-l-4 border-yellow-500">
                        <div className="flex-auto p-4">
                            <div className="flex flex-row items-center">
                                <div className="flex-none px-3">
                                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-yellow-100">
                                        <i className="ni ni-notification-70 text-lg relative top-3.5 text-yellow-600"></i>
                                    </div>
                                </div>
                                <div className="flex-none w-2/3 max-w-full px-3">
                                    <h5 className="mb-0 font-bold dark:text-white">Complete Your Profile</h5>
                                    <p className="mb-0 text-sm dark:text-gray-400">
                                        Please add your profile photo and info to get the most out of SSIT Atlas.
                                    </p>
                                </div>
                                <div className="px-3 text-right flex-1">
                                    <Link to="/profile" className="inline-block px-6 py-2.5 mb-0 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-yellow-500 to-orange-500 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs">
                                        Update Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Role Specific Sections */}
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 mt-0 mb-6 lg:mb-0 lg:flex-none">
                    {user.role === 'ADMIN' && <AdminSection user={user} />}
                    {user.role === 'CULTURAL_COMMITTEE' && <CulturalSection user={user} />}
                    {user.role === 'MANAGEMENT_TEAM' && <ManagementSection user={user} />}
                    {user.role === 'PLACEMENT_DEPARTMENT' && <PlacementSection user={user} />}
                    {user.role === 'HOD' && <HodSection user={user} />}
                    {user.role === 'FACULTY' && <FacultySection user={user} />}
                    {user.role === 'STUDENT' && <StudentSection user={user} />}
                </div>
            </div>
        </DashboardLayout>
    );
};


const AdminSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-6">
                <h3 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-300">System Management</h3>
                <p className="mb-4 text-sm text-gray-500">Manage users, buildings, and system settings.</p>
                <Link to="/admin/users" className="inline-block px-6 py-3 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-blue-500 to-violet-500 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs">Manage Users</Link>
            </div>
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-800 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-6">
                <h3 className="text-xl font-bold mb-2 text-emerald-800 dark:text-emerald-300">Audit Logs</h3>
                <p className="mb-4 text-sm text-gray-500">View system activity and security logs.</p>
                <Link to="/admin/logs" className="inline-block px-6 py-3 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-emerald-500 to-teal-400 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs">View Logs</Link>
            </div>
        </div>
    </div>
);


const CulturalSection = ({ user }) => {
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-700 dark:text-white">Event Management</h3>
                    <div>
                        <button
                            onClick={() => setIsCreatingEvent(!isCreatingEvent)}
                            className="inline-block px-6 py-3 mr-3 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-purple-700 to-pink-500 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs"
                        >
                            {isCreatingEvent ? 'Cancel' : 'Create New Event'}
                        </button>
                        <Link to="/events" className="inline-block px-6 py-3 font-bold text-center text-slate-700 align-middle transition-all bg-transparent border border-slate-700 rounded-lg cursor-pointer shadow-md hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs">Manage Events</Link>
                    </div>
                </div>

                {isCreatingEvent && (
                    <div className="mt-4 animate-fade-in">
                        <CreateEvent
                            onClose={() => setIsCreatingEvent(false)}
                            onEventCreated={() => alert('Event created! You can view it on the Events page.')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const ManagementSection = () => {
    const [isManagingBuildings, setIsManagingBuildings] = useState(false);

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-700 dark:text-white">Infrastructure Management</h3>
                    <div>
                        <button
                            onClick={() => setIsManagingBuildings(!isManagingBuildings)}
                            className="inline-block px-6 py-3 mr-3 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-orange-500 to-yellow-500 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs"
                        >
                            {isManagingBuildings ? 'Close Manager' : 'Update Building Data'}
                        </button>
                        <button className="inline-block px-6 py-3 font-bold text-center text-slate-700 align-middle transition-all bg-transparent border border-slate-700 rounded-lg cursor-pointer shadow-md hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs">
                            View Campus Stats
                        </button>
                    </div>
                </div>

                {isManagingBuildings && (
                    <div className="mt-4">
                        <BuildingManager onClose={() => setIsManagingBuildings(false)} />
                    </div>
                )}
            </div>
        </div>
    );
};

const PlacementSection = ({ user }) => {
    const [isAddingRecord, setIsAddingRecord] = useState(false);

    return (
        <div className="space-y-6">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-700 dark:text-white">Placement Cell</h3>
                        <div>
                            <button
                                onClick={() => setIsAddingRecord(!isAddingRecord)}
                                className="inline-block px-6 py-3 mr-3 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-blue-600 to-cyan-400 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs"
                            >
                                {isAddingRecord ? 'Cancel' : 'Add Placement Record'}
                            </button>
                            <button className="inline-block px-6 py-3 font-bold text-center text-slate-700 align-middle transition-all bg-transparent border border-slate-700 rounded-lg cursor-pointer shadow-md hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs">
                                View Statistics
                            </button>
                        </div>
                    </div>

                    {isAddingRecord && (
                        <AddPlacementRecord
                            onClose={() => setIsAddingRecord(false)}
                            onRecordAdded={() => window.location.reload()}
                        />
                    )}
                    <PlacementStats />
                </div>
            </div>

            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-black/20">
                    <h6 className="dark:text-white">Recent Placements</h6>
                </div>
                <div className="flex-auto p-6">
                    <PlacementList />
                </div>
            </div>
        </div>
    );
};

const HodSection = ({ user }) => {
    const [isCreatingNotice, setIsCreatingNotice] = useState(false);

    return (
        <div className="space-y-6">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-700 dark:text-white">Department Head: {user.department}</h3>
                        <div>
                            <button
                                onClick={() => setIsCreatingNotice(!isCreatingNotice)}
                                className="inline-block px-6 py-3 mr-3 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-emerald-500 to-teal-400 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs"
                            >
                                {isCreatingNotice ? 'Cancel' : 'Post Notice'}
                            </button>
                            <button className="inline-block px-6 py-3 font-bold text-center text-slate-700 align-middle transition-all bg-transparent border border-slate-700 rounded-lg cursor-pointer shadow-md hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs">
                                Department Achievements
                            </button>
                        </div>
                    </div>

                    {isCreatingNotice && (
                        <CreateNotice
                            user={user}
                            onClose={() => setIsCreatingNotice(false)}
                            onNoticeCreated={() => window.location.reload()}
                        />
                    )}
                </div>
            </div>

            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-black/20">
                    <h6 className="dark:text-white">Department Notices</h6>
                </div>
                <div className="flex-auto p-6">
                    <NoticeList department={user.department} />
                </div>
            </div>
        </div>
    );
};

const FacultySection = ({ user }) => (
    <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
        <div className="flex-auto p-6">
            <h3 className="text-lg font-bold mb-4 text-slate-700 dark:text-white">Faculty Portal: {user.department}</h3>
            <div className="mb-6">
                <button className="inline-block px-6 py-3 mr-3 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-cyan-500 to-blue-500 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs">My Achievements</button>
                <button className="inline-block px-6 py-3 font-bold text-center text-slate-700 align-middle transition-all bg-transparent border border-slate-700 rounded-lg cursor-pointer shadow-md hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs">Class Schedule</button>
            </div>

            <div className="mt-8">
                <h4 className="font-bold mb-4 text-slate-700 dark:text-white">Department Notices</h4>
                <NoticeList department={user.department} />
            </div>
        </div>
    </div>
);

const StudentSection = ({ user }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4 text-center">
                    <h3 className="font-bold text-slate-700 dark:text-white mb-2">My Placements</h3>
                    <button className="text-sm font-semibold text-blue-500 hover:text-blue-600">View Status</button>
                </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4 text-center">
                    <h3 className="font-bold text-slate-700 dark:text-white mb-2">Events Registered</h3>
                    <button className="text-sm font-semibold text-pink-500 hover:text-pink-600">View Tickets</button>
                </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4 text-center">
                    <h3 className="font-bold text-slate-700 dark:text-white mb-2">Notices</h3>
                    <button className="text-sm font-semibold text-slate-500 hover:text-slate-600">Check Inbox</button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-black/20">
                    <h6 className="dark:text-white">Pinned Notices</h6>
                </div>
                <div className="flex-auto p-6">
                    <NoticeList showPinnedOnly={true} />
                </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-black/20">
                    <h6 className="dark:text-white">Department Notices ({user.department})</h6>
                </div>
                <div className="flex-auto p-6">
                    <NoticeList department={user.department} />
                </div>
            </div>
        </div>
    </div>
);

export default Dashboard;
