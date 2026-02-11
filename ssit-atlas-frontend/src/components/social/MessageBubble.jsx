import React from 'react';
import { format } from 'date-fns';
import { FaCheck, FaCheckDouble } from 'react-icons/fa';
import './MessageBubble.css';

const MessageBubble = ({ message, isOwnMessage }) => {
    const formatTime = (timestamp) => {
        return format(new Date(timestamp), 'HH:mm');
    };

    const getStatusIcon = () => {
        if (!isOwnMessage) return null;

        switch (message.status) {
            case 'SENT':
                return <FaCheck className="status-icon sent" />;
            case 'DELIVERED':
                return <FaCheckDouble className="status-icon delivered" />;
            case 'READ':
                return <FaCheckDouble className="status-icon read" />;
            default:
                return null;
        }
    };

    return (
        <div className={`message-bubble ${isOwnMessage ? 'own' : 'other'}`}>
            <div className="message-content">
                {message.messageType === 'TEXT' && (
                    <p className="message-text">{message.content}</p>
                )}
                {message.messageType === 'LOCATION_SHARE' && message.locationData && (
                    <div className="location-message">
                        <div className="location-icon">📍</div>
                        <div className="location-info">
                            <div className="location-name">{message.locationData.locationName}</div>
                            <div className="location-coords">
                                {message.locationData.latitude}, {message.locationData.longitude}
                            </div>
                        </div>
                    </div>
                )}
                <div className="message-meta">
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                    {getStatusIcon()}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
