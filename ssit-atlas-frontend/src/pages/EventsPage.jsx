import { useState, useEffect } from 'react';
import api from '../api/axios';
import EventRegistration from '../components/events/EventRegistration';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, userRes] = await Promise.allSettled([
                    api.get('/events'),
                    api.get('/auth/me')
                ]);

                if (eventsRes.status === 'fulfilled') setEvents(eventsRes.value.data);
                if (userRes.status === 'fulfilled') setUser(userRes.value.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
                            <div key={event.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                                {event.posterUrl && (
                                    <img src={event.posterUrl} alt={event.title} className="w-full h-48 object-cover rounded-md mb-4" />
                                )}
                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                                    {event.eventType || "General"}
                                </span>
                                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {event.title}
                                </h2>
                                <p className="mb-5 font-light text-gray-500 dark:text-gray-400 flex-grow">
                                    {event.description}
                                </p>

                                <div className="space-y-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex justify-between">
                                        <span>Start:</span>
                                        <span>{new Date(event.startTime).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Location:</span>
                                        <span>{event.buildingId ? `Building ${event.buildingId}` : 'TBD'} {event.roomId ? `- ${event.roomId}` : ''}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Organizer:</span>
                                        <span>{event.organizer}</span>
                                    </div>
                                    {event.capacity && (
                                        <div className="flex justify-between">
                                            <span>Capacity:</span>
                                            <span>{event.registeredUserIds?.length || 0} / {event.capacity}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                                    {event.brochureUrl && (
                                        <a href={event.brochureUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                                            View Brochure
                                        </a>
                                    )}

                                    {event.registrationRequired && (
                                        <EventRegistration
                                            event={event}
                                            user={user}
                                            onRegistered={() => window.location.reload()}
                                        />
                                    )}
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
