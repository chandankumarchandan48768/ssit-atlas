import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import websocketClient from '../utils/websocketClient';
import FriendsList from '../components/social/FriendsList';
import ChatWindow from '../components/social/ChatWindow';
import UserSearch from '../components/social/UserSearch';
import FriendRequests from '../components/social/FriendRequests';
import { FaUserPlus, FaUserFriends, FaComments } from 'react-icons/fa';
import './SocialPage.css';

const SocialPage = () => {
    const navigate = useNavigate();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'search', 'requests'
    const [wsConnected, setWsConnected] = useState(false);

    useEffect(() => {
        // Get user ID from token
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Decode JWT to get user ID (basic parsing, no validation needed on frontend)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUserId(payload.sub);
        } catch (error) {
            console.error('Failed to parse token:', error);
            navigate('/login');
            return;
        }

        // Connect to WebSocket
        websocketClient.connect(
            token,
            () => {
                console.log('WebSocket connected successfully');
                setWsConnected(true);
            },
            (error) => {
                console.error('WebSocket connection error:', error);
                setWsConnected(false);
            }
        );

        // Cleanup on unmount
        return () => {
            websocketClient.disconnect();
        };
    }, [navigate]);

    const handleSelectFriend = (friend) => {
        setSelectedFriend(friend);
        setActiveTab('chat');
    };

    const handleRequestUpdate = () => {
        // Reload friends list when a request is accepted
        window.location.reload();
    };

    return (
        <div className="social-page">
            <div className="social-container">
                {/* Sidebar */}
                <div className="social-sidebar">
                    <div className="sidebar-header">
                        <h2>Social</h2>
                        {!wsConnected && (
                            <span className="connection-status">Connecting...</span>
                        )}
                    </div>

                    <div className="sidebar-tabs">
                        <button
                            className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
                            onClick={() => setActiveTab('chat')}
                        >
                            <FaComments /> Chats
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
                            onClick={() => setActiveTab('search')}
                        >
                            <FaUserPlus /> Add Friends
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
                            onClick={() => setActiveTab('requests')}
                        >
                            <FaUserFriends /> Requests
                        </button>
                    </div>

                    <div className="sidebar-content">
                        {activeTab === 'chat' && (
                            <FriendsList
                                onSelectFriend={handleSelectFriend}
                                selectedFriendId={selectedFriend?.userId}
                            />
                        )}
                        {activeTab === 'search' && <UserSearch />}
                        {activeTab === 'requests' && (
                            <FriendRequests onRequestUpdate={handleRequestUpdate} />
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="social-main">
                    <ChatWindow friend={selectedFriend} currentUserId={currentUserId} />
                </div>
            </div>
        </div>
    );
};

export default SocialPage;
