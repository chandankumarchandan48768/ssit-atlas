import React, { useState } from 'react';
import { searchUsers, sendFriendRequest } from '../../services/friendsApi';
import { FaSearch, FaUserPlus, FaCheck } from 'react-icons/fa';
import './UserSearch.css';

const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sentRequests, setSentRequests] = useState(new Set());

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            setLoading(true);
            const data = await searchUsers(query);
            setResults(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendRequest = async (userId) => {
        try {
            await sendFriendRequest(userId);
            setSentRequests(new Set([...sentRequests, userId]));
        } catch (error) {
            console.error('Failed to send request:', error);
            alert(error.response?.data?.message || 'Failed to send friend request');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="user-search">
            <div className="search-header">
                <h3>Add Friends</h3>
            </div>
            <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search by name or email..."
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            <div className="search-results">
                {results.length === 0 ? (
                    <div className="no-results">
                        {query ? 'No users found' : 'Search for users to add as friends'}
                    </div>
                ) : (
                    results.map((user) => (
                        <div key={user.id} className="search-result-item">
                            <div className="user-avatar">
                                {user.profilePhotoUrl ? (
                                    <img src={`http://localhost:8080${user.profilePhotoUrl}`} alt={user.name} />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="user-info">
                                <div className="user-name">{user.name}</div>
                                <div className="user-email">{user.email}</div>
                                {user.department && (
                                    <div className="user-department">{user.department}</div>
                                )}
                            </div>
                            <button
                                onClick={() => handleSendRequest(user.id)}
                                className="add-friend-button"
                                disabled={sentRequests.has(user.id)}
                            >
                                {sentRequests.has(user.id) ? (
                                    <>
                                        <FaCheck /> Sent
                                    </>
                                ) : (
                                    <>
                                        <FaUserPlus /> Add Friend
                                    </>
                                )}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserSearch;
