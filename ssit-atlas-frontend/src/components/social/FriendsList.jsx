import React, { useState, useEffect } from 'react';
import { getFriendsList } from '../../services/friendsApi';
import OnlineStatusBadge from './OnlineStatusBadge';
import { FaUser, FaComments } from 'react-icons/fa';
import './FriendsList.css';

const FriendsList = ({ onSelectFriend, selectedFriendId }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadFriends();
    }, []);

    const loadFriends = async () => {
        try {
            setLoading(true);
            const data = await getFriendsList();
            setFriends(data);
            setError(null);
        } catch (err) {
            setError('Failed to load friends');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="friends-list-loading">Loading friends...</div>;
    }

    if (error) {
        return <div className="friends-list-error">{error}</div>;
    }

    return (
        <div className="friends-list">
            <div className="friends-list-header">
                <h3>Friends ({friends.length})</h3>
            </div>
            <div className="friends-list-content">
                {friends.length === 0 ? (
                    <div className="no-friends">
                        <FaUser className="no-friends-icon" />
                        <p>No friends yet</p>
                        <p className="hint">Search for users to add friends</p>
                    </div>
                ) : (
                    friends.map((friend) => (
                        <div
                            key={friend.userId}
                            className={`friend-item ${selectedFriendId === friend.userId ? 'selected' : ''}`}
                            onClick={() => onSelectFriend(friend)}
                        >
                            <div className="friend-avatar">
                                {friend.profilePhotoUrl ? (
                                    <img src={`http://localhost:8080${friend.profilePhotoUrl}`} alt={friend.name} />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {friend.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="friend-info">
                                <div className="friend-name">{friend.name}</div>
                                <OnlineStatusBadge isOnline={friend.online} lastSeenAt={friend.lastSeenAt} />
                                {friend.status && <div className="friend-status">{friend.status}</div>}
                            </div>
                            {friend.unreadCount > 0 && (
                                <div className="unread-badge">{friend.unreadCount}</div>
                            )}
                            <FaComments className="chat-icon" />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FriendsList;
