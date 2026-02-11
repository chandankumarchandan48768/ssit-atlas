import React, { useState, useEffect, useRef } from 'react';
import { getChatHistory, markMessagesAsRead } from '../../services/chatApi';
import websocketClient from '../../utils/websocketClient';
import MessageBubble from './MessageBubble';
import OnlineStatusBadge from './OnlineStatusBadge';
import { FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa';
import './ChatWindow.css';

const ChatWindow = ({ friend, currentUserId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [typing, setTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(friend?.online || false);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        if (friend) {
            setIsOnline(friend.online || false);
            loadMessages();
            markAsRead();

            // Subscribe to new messages
            const subscription = websocketClient.subscribe('/user/queue/messages', handleNewMessage);
            const typingSubscription = websocketClient.subscribe('/user/queue/typing', handleTypingIndicator);
            const ackSubscription = websocketClient.subscribe('/user/queue/message-ack', handleMessageAck);
            const errorSubscription = websocketClient.subscribe('/user/queue/message-error', handleMessageError);

            // Subscribe to presence updates
            websocketClient.onPresenceUpdate(handlePresenceUpdate);

            return () => {
                if (subscription) subscription.unsubscribe();
                if (typingSubscription) typingSubscription.unsubscribe();
                if (ackSubscription) ackSubscription.unsubscribe();
                if (errorSubscription) errorSubscription.unsubscribe();
            };
        }
    }, [friend]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handlePresenceUpdate = (data, isBulkUpdate = false) => {
        if (isBulkUpdate) {
            // Handle bulk friends presence update
            if (data[friend?.userId]) {
                setIsOnline(data[friend.userId].online);
            }
        } else {
            // Handle single presence update
            if (data.userId === friend?.userId) {
                setIsOnline(data.online);
            }
        }
    };

    const loadMessages = async () => {
        try {
            setLoading(true);
            const data = await getChatHistory(friend.userId);
            setMessages(data.reverse()); // Reverse to show oldest first
        } catch (error) {
            console.error('Failed to load messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async () => {
        try {
            await markMessagesAsRead(friend.userId);
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleNewMessage = (message) => {
        // Check if message is from or to current friend
        if (message.senderId === friend.userId || message.receiverId === friend.userId) {
            setMessages((prev) => [...prev, message]);
            if (message.senderId === friend.userId) {
                markAsRead();
            }
        }
    };

    const handleMessageAck = (ack) => {
        console.log('Message delivered:', ack);
        // Optionally update message status in UI
    };

    const handleMessageError = (error) => {
        console.error('Message failed:', error);
        alert('Failed to send message: ' + error.error);
    };

    const handleTypingIndicator = (data) => {
        if (data.senderId === friend.userId) {
            setTyping(data.typing);
            if (data.typing) {
                // Auto-hide typing indicator after 3 seconds
                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = setTimeout(() => setTyping(false), 3000);
            }
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            receiverId: friend.userId,
            content: newMessage,
            messageType: 'TEXT',
        };

        websocketClient.sendMessage('/app/chat.send', messageData);
        setNewMessage('');
        stopTyping();
    };

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
        sendTypingIndicator(true);

        // Auto-stop typing after 2 seconds of inactivity
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => stopTyping(), 2000);
    };

    const sendTypingIndicator = (isTyping) => {
        websocketClient.sendMessage('/app/chat.typing', {
            receiverId: friend.userId,
            typing: isTyping,
        });
    };

    const stopTyping = () => {
        sendTypingIndicator(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!friend) {
        return (
            <div className="chat-window-empty">
                <div className="empty-state">
                    <h3>Select a friend to start chatting</h3>
                    <p>Choose a friend from the list to view your conversation</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-friend-info">
                    <div className="chat-friend-avatar">
                        {friend.profilePhotoUrl ? (
                            <img src={`http://localhost:8080${friend.profilePhotoUrl}`} alt={friend.name} />
                        ) : (
                            <div className="avatar-placeholder">
                                {friend.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="chat-friend-name">{friend.name}</div>
                        <OnlineStatusBadge isOnline={isOnline} lastSeenAt={friend.lastSeenAt} />
                    </div>
                </div>
            </div>

            <div className="chat-messages">
                {loading ? (
                    <div className="messages-loading">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="no-messages">
                        <p>No messages yet</p>
                        <p className="hint">Start a conversation!</p>
                    </div>
                ) : (
                    <>
                        {messages.map((msg, index) => (
                            <MessageBubble
                                key={index}
                                message={msg}
                                isOwnMessage={msg.senderId === currentUserId}
                            />
                        ))}
                        {typing && (
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <div className="chat-input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="chat-input"
                />
                <button onClick={sendMessage} className="send-button" disabled={!newMessage.trim()}>
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
