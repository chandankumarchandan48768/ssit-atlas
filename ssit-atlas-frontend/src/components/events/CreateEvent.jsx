import { useState } from 'react';
import api from '../../api/axios';

const CreateEvent = ({ onClose, onEventCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        organizer: 'Cultural Committee',
        buildingId: '',
        roomId: '',
        eventType: 'CULTURAL',
        capacity: '',
        registrationRequired: false,
        registrationDeadline: '',
        posterUrl: '', // URL for now
        brochureUrl: '' // URL for now
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                startTime: new Date(formData.startTime).toISOString(),
                endTime: new Date(formData.endTime).toISOString(),
                registrationDeadline: formData.registrationDeadline ? new Date(formData.registrationDeadline).toISOString() : null,
                capacity: formData.capacity ? parseInt(formData.capacity) : null,
                tags: [formData.eventType]
            };

            await api.post('/events', payload);
            if (onEventCreated) onEventCreated();
            if (onClose) onClose();
            alert('Event created successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to create event.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Event</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Title</label>
                        <input type="text" name="title" required value={formData.title} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea name="description" rows="3" required value={formData.description} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
                        <input type="datetime-local" name="startTime" required value={formData.startTime} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
                        <input type="datetime-local" name="endTime" required value={formData.endTime} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                        <select name="eventType" value={formData.eventType} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white">
                            <option value="CULTURAL">Cultural</option>
                            <option value="TECHNICAL">Technical</option>
                            <option value="SPORTS">Sports</option>
                            <option value="WORKSHOP">Workshop</option>
                            <option value="SEMINAR">Seminar</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Capacity</label>
                        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>

                    <div className="md:col-span-2 flex items-center">
                        <input type="checkbox" name="registrationRequired" id="regReq" checked={formData.registrationRequired} onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="regReq" className="ml-2 block text-sm text-gray-900 dark:text-white">Registration Required</label>
                    </div>

                    {formData.registrationRequired && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Registration Deadline</label>
                            <input type="datetime-local" name="registrationDeadline" required value={formData.registrationDeadline} onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    {onClose && (
                        <button type="button" onClick={onClose}
                            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                            Cancel
                        </button>
                    )}
                    <button type="submit" disabled={loading}
                        className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
