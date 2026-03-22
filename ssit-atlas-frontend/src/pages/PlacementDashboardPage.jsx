import { useState, useEffect } from 'react';
import {
    TrendingUp,
    Users,
    Briefcase,
    Award,
    Filter,
    Calendar,
    Building2,
    DollarSign,
} from 'lucide-react';
import { CardSkeleton } from '../components/ui/SkeletonLoader';
import useCountUp from '../hooks/useCountUp';
import useInView from '../hooks/useInView';
import api from '../api/axios';

const PlacementDashboardPage = () => {
    const [placements, setPlacements] = useState([]);
    const [stats, setStats] = useState({
        totalPlacements: 0,
        averageSalary: 0,
        topPackage: 0,
        companiesVisited: 0,
    });
    const [loading, setLoading] = useState(true);
    const [filterYear, setFilterYear] = useState('ALL');
    const [filterDepartment, setFilterDepartment] = useState('ALL');

    const [statsRef, statsInView] = useInView({ threshold: 0.3 });

    // Animated counters
    const totalCount = useCountUp(stats.totalPlacements, 2000, statsInView);
    const avgSalaryCount = useCountUp(stats.averageSalary, 2000, statsInView);
    const topPackageCount = useCountUp(stats.topPackage, 2000, statsInView);
    const companiesCount = useCountUp(stats.companiesVisited, 2000, statsInView);

    useEffect(() => {
        fetchPlacements();
        fetchStats();
    }, []);

    const fetchPlacements = async () => {
        try {
            setLoading(true);
            const response = await api.get('/placements');
            setPlacements(response.data || []);
        } catch (error) {
            console.error('Error fetching placements:', error);
            setPlacements([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await api.get('/placements/stats');
            setStats(response.data || stats);
        } catch (error) {
            console.error('Error fetching placement stats:', error);
        }
    };

    const filteredPlacements = placements.filter((placement) => {
        const matchesYear = filterYear === 'ALL' || placement.year === filterYear;
        const matchesDept = filterDepartment === 'ALL' || placement.department === filterDepartment;
        return matchesYear && matchesDept;
    });

    const statCards = [
        {
            title: 'Total Placements',
            value: totalCount,
            icon: <Users className="w-8 h-8" />,
            gradient: 'from-blue-500 to-cyan-500',
            suffix: '+',
        },
        {
            title: 'Average Package',
            value: avgSalaryCount,
            icon: <DollarSign className="w-8 h-8" />,
            gradient: 'from-green-500 to-emerald-500',
            prefix: '₹',
            suffix: ' LPA',
        },
        {
            title: 'Highest Package',
            value: topPackageCount,
            icon: <TrendingUp className="w-8 h-8" />,
            gradient: 'from-purple-500 to-pink-500',
            prefix: '₹',
            suffix: ' LPA',
        },
        {
            title: 'Companies Visited',
            value: companiesCount,
            icon: <Briefcase className="w-8 h-8" />,
            gradient: 'from-orange-500 to-red-500',
            suffix: '+',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Placement Dashboard
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Track our students' success stories and career achievements
                    </p>
                </div>

                {/* Stats Cards */}
                <div
                    ref={statsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                >
                    {statCards.map((card, index) => (
                        <div
                            key={index}
                            className={`glass-card rounded-2xl p-6 animate-zoom-in hover-lift`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white`}
                                >
                                    {card.icon}
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {card.prefix || ''}
                                {card.value}
                                {card.suffix || ''}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                                {card.title}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="glass-card rounded-2xl p-6 mb-8 animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Year Filter */}
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="ALL">All Years</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>

                        {/* Department Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterDepartment}
                                onChange={(e) => setFilterDepartment(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="ALL">All Departments</option>
                                <option value="CSE">Computer Science</option>
                                <option value="ISE">Information Science</option>
                                <option value="ECE">Electronics</option>
                                <option value="ME">Mechanical</option>
                                <option value="CIVIL">Civil</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Placements Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredPlacements.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-6">
                            <Award size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No Placements Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Try adjusting your filters or check back later
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPlacements.map((placement, index) => (
                            <div
                                key={placement.id}
                                className="group glass-card rounded-2xl overflow-hidden hover-lift animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Student Photo */}
                                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                                    {placement.photoUrl ? (
                                        <img
                                            src={placement.photoUrl}
                                            alt={placement.studentName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Users size={64} className="text-white/50" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {placement.studentName}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {placement.usn}
                                    </p>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <Building2 size={18} />
                                            <span className="font-semibold">{placement.company}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <Briefcase size={18} />
                                            <span>{placement.role || 'Software Engineer'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold">
                                            <DollarSign size={18} />
                                            <span>₹{placement.package} LPA</span>
                                        </div>
                                    </div>

                                    {/* Department Badge */}
                                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                        {placement.department}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlacementDashboardPage;
