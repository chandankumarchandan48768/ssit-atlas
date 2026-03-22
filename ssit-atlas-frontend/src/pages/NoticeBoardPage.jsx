import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Pin, Calendar, User, FileText } from 'lucide-react';
import { CardSkeleton } from '../components/ui/SkeletonLoader';
import api from '../api/axios';

const NoticeBoardPage = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('ALL');
    const [filterPriority, setFilterPriority] = useState('ALL');
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            setLoading(true);
            const response = await api.get('/notices');
            setNotices(response.data || []);
        } catch (error) {
            console.error('Error fetching notices:', error);
            setNotices([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredNotices = notices.filter((notice) => {
        const matchesSearch = notice.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notice.content?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = filterDepartment === 'ALL' || notice.department === filterDepartment;
        const matchesPriority = filterPriority === 'ALL' || notice.priority === filterPriority;
        return matchesSearch && matchesDepartment && matchesPriority;
    });

    const departments = ['ALL', 'CSE', 'ISE', 'ECE', 'ME', 'CIVIL'];
    const priorities = ['ALL', 'URGENT', 'HIGH', 'NORMAL', 'LOW'];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'URGENT':
                return 'bg-gradient-error text-white';
            case 'HIGH':
                return 'bg-gradient-warning text-white';
            case 'NORMAL':
                return 'bg-gradient-info text-white';
            case 'LOW':
                return 'bg-gradient-success text-white';
            default:
                return 'bg-gray-200 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Notice Board
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Stay updated with important announcements and notices
                    </p>
                </div>

                {/* Filters */}
                <div className="glass-card rounded-2xl p-6 mb-8 animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search notices..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Department Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterDepartment}
                                onChange={(e) => setFilterDepartment(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept === 'ALL' ? 'All Departments' : dept}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Priority Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                {priorities.map((priority) => (
                                    <option key={priority} value={priority}>
                                        {priority === 'ALL' ? 'All Priorities' : priority}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notices Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredNotices.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-6">
                            <FileText size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No Notices Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {searchTerm || filterDepartment !== 'ALL' || filterPriority !== 'ALL'
                                ? 'Try adjusting your filters'
                                : 'Check back later for new announcements'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotices.map((notice, index) => (
                            <div
                                key={notice.id}
                                className="group glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up cursor-pointer"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => navigate(`/notices/${notice.id}`)}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <span className={`badge ${getPriorityColor(notice.priority)}`}>
                                        {notice.priority || 'NORMAL'}
                                    </span>
                                    {notice.isPinned && (
                                        <Pin size={18} className="text-yellow-500" />
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {notice.title}
                                </h3>

                                {/* Content Preview */}
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                    {notice.content}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex items-center gap-1">
                                        <User size={16} />
                                        <span>{notice.authorName || 'System'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Department Tag */}
                                {notice.department && (
                                    <div className="mt-3">
                                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                            {notice.department}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoticeBoardPage;
