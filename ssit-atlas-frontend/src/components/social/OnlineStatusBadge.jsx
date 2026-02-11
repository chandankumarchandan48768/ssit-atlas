import React from 'react';
import { FaCircle } from 'react-icons/fa';
import './OnlineStatusBadge.css';

const OnlineStatusBadge = ({ isOnline, lastSeenAt }) => {
    const getLastSeenText = () => {
        if (isOnline) return 'Online';
        if (!lastSeenAt) return 'Offline';

        const now = new Date();
        const lastSeen = new Date(lastSeenAt);
        const diffMs = now - lastSeen;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return 'Long ago';
    };

    return (
        <div className="online-status-badge">
            <FaCircle className={`status-dot ${isOnline ? 'online' : 'offline'}`} />
            <span className="status-text">{getLastSeenText()}</span>
        </div>
    );
};

export default OnlineStatusBadge;
