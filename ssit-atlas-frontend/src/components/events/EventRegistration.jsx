import { useState } from 'react';
import api from '../../api/axios';

const EventRegistration = ({ event, user, onRegistered }) => {
    const [loading, setLoading] = useState(false);

    // Check if user already registered
    const isRegistered = event.registeredUserIds && event.registeredUserIds.includes(user.id);
    const isFull = event.capacity && event.registeredUserIds && event.registeredUserIds.length >= event.capacity;
    const isDeadlinePassed = event.registrationDeadline && new Date() > new Date(event.registrationDeadline);

    const handleRegister = async () => {
        if (!confirm(`Confirm registration for ${event.title}?`)) return;

        setLoading(true);
        try {
            await api.post(`/events/${event.id}/register`);
            alert('Successfully registered!');
            if (onRegistered) onRegistered();
        } catch (error) {
            console.error("Registration failed", error);
            alert('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!confirm(`Cancel registration for ${event.title}?`)) return;

        setLoading(true);
        try {
            await api.delete(`/events/${event.id}/register`);
            alert('Registration cancelled.');
            if (onRegistered) onRegistered();
        } catch (error) {
            console.error("Cancellation failed", error);
            alert('Cancellation failed.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <p className="text-sm text-gray-500">Log in to register</p>;

    if (isRegistered) {
        return (
            <button
                onClick={handleCancel}
                disabled={loading}
                className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
            >
                {loading ? 'Processing...' : 'Cancel RSVP'}
            </button>
        );
    }

    if (isDeadlinePassed) {
        return <span className="text-red-500 text-sm font-medium">Registration Closed</span>;
    }

    if (isFull) {
        return <span className="text-orange-500 text-sm font-medium">Event Full</span>;
    }

    return (
        <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
        >
            {loading ? 'Processing...' : 'Register Now'}
        </button>
    );
};

export default EventRegistration;
