import React, { useState, useEffect } from 'react';
import { getPendingRequests, acceptFriendRequest, rejectFriendRequest } from '../../services/friendsApi';
import { FaCheck, FaTimes, FaUserFriends } from 'react-icons/fa';
import './FriendRequests.css';

const FriendRequests = ({ onRequestUpdate }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            setLoading(true);
            const data = await getPendingRequests();
            setRequests(data);
        } catch (error) {
            console.error('Failed to load requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (requestId) => {
        try {
            await acceptFriendRequest(requestId);
            setRequests(requests.filter((req) => req.id !== requestId));
            if (onRequestUpdate) onRequestUpdate();
        } catch (error) {
            console.error('Failed to accept request:', error);
        }
    };

    const handleReject = async (requestId) => {
        try {
            await rejectFriendRequest(requestId);
            setRequests(requests.filter((req) => req.id !== requestId));
        } catch (error) {
            console.error('Failed to reject request:', error);
        }
    };

    if (loading) {
        return <div className="friend-requests-loading">Loading requests...</div>;
    }

    return (
        <div className="friend-requests">
            <div className="requests-header">
                <h3>Friend Requests ({requests.length})</h3>
            </div>
            <div className="requests-content">
                {requests.length === 0 ? (
                    <div className="no-requests">
                        <FaUserFriends className="no-requests-icon" />
                        <p>No pending requests</p>
                    </div>
                ) : (
                    requests.map((request) => (
                        <div key={request.id} className="request-item">
                            <div className="request-info">
                                <div className="sender-name">Friend request from User {request.senderId}</div>
                                <div className="request-time">
                                    {new Date(request.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <div className="request-actions">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="accept-button"
                                >
                                    <FaCheck /> Accept
                                </button>
                                <button
                                    onClick={() => handleReject(request.id)}
                                    className="reject-button"
                                >
                                    <FaTimes /> Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FriendRequests;
