import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, Grid, List, Search } from 'lucide-react';
import { CardSkeleton } from '../components/ui/SkeletonLoader';
import EventRegistration from '../components/events/EventRegistration';
import api from '../api/axios';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [filterType, setFilterType] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, userRes] = await Promise.allSettled([
                    api.get('/events'),
                    api.get('/auth/me')
                ]);

                if (eventsRes.status === 'fulfilled') setEvents(eventsRes.value.data || []);
                if (userRes.status === 'fulfilled') setUser(userRes.value.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredEvents = events.filter((event) => {
        const matchesType = filterType === 'ALL' || event.eventType === filterType;
        const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const eventTypes = ['ALL', 'TECHNICAL', 'CULTURAL', 'SPORTS', 'WORKSHOP', 'SEMINAR'];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Campus Events
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Discover and register for upcoming events
                    </p>
                </div>

                {/* Controls */}
                <div className="glass-card rounded-2xl p-6 mb-8 animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Type Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                {eventTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type === 'ALL' ? 'All Events' : type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}
                            aria-label="Grid view"
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}
                            aria-label="List view"
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                {/* Events Grid/List */}
                {loading ? (
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {[...Array(6)].map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-6">
                            <Calendar size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No Events Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {searchTerm || filterType !== 'ALL'
                                ? 'Try adjusting your filters'
                                : 'Check back later for new events'}
                        </p>
                    </div>
                ) : (
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {filteredEvents.map((event, index) => (
                            <div
                                key={event.id}
                                className="group glass-card rounded-2xl overflow-hidden hover-lift animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Event Image/Banner */}
                                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden relative">
                                    {event.posterUrl ? (
                                        <img
                                            src={event.posterUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <Calendar size={64} className="text-white/50" />
                                    )}
                                    {/* Event Type Badge */}
                                    <span className="absolute top-4 left-4 badge badge-primary">
                                        {event.eventType || 'General'}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                        {event.description}
                                    </p>

                                    {/* Event Details */}
                                    <div className="space-y-2 mb-4 text-sm">
                                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <Clock size={16} />
                                            <span>{new Date(event.startTime).toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <MapPin size={16} />
                                            <span>
                                                {event.buildingId ? `Building ${event.buildingId}` : 'TBD'}
                                                {event.roomId && ` - ${event.roomId}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <Users size={16} />
                                            <span>{event.organizer}</span>
                                        </div>
                                        {event.capacity && (
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                                                <span className="text-gray-600 dark:text-gray-400">Seats:</span>
                                                <span className="font-semibold">
                                                    {event.registeredUserIds?.length || 0} / {event.capacity}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        {event.brochureUrl && (
                                            <a
                                                href={event.brochureUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 text-center rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-medium"
                                            >
                                                Brochure
                                            </a>
                                        )}
                                        {event.registrationRequired && (
                                            <div className="flex-1">
                                                <EventRegistration
                                                    event={event}
                                                    user={user}
                                                    onRegistered={() => window.location.reload()}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
