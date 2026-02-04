import { useState, useEffect } from 'react';
import api from '../api/axios';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events');
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading events...</div>;

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div className="px-4 mx-auto max-w-screen-xl">
                <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Upcoming Events</h2>

                {events.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No upcoming events found.</p>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <div key={event.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                    {event.tags?.join(", ") || "General"}
                                </span>
                                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {event.title}
                                </h2>
                                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                                    {event.description}
                                </p>
                                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                    <span>
                                        Start: {new Date(event.startTime).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    <span>
                                        Location: {event.buildingId ? `Building ${event.buildingId}` : 'TBD'} - {event.roomId || ''}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        Organizer: {event.organizer}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventsPage;
