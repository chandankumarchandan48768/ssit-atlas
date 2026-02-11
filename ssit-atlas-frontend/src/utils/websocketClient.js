import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

class WebSocketClient {
    constructor() {
        this.client = null;
        this.connected = false;
        this.subscriptions = new Map();
        this.heartbeatInterval = null;
        this.presenceCallbacks = [];
    }

    connect(token, onConnect, onError) {
        if (this.connected) {
            console.log('Already connected');
            return;
        }

        const socket = new SockJS('http://localhost:8080/ws');

        this.client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => {
                console.log('STOMP Debug:', str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                this.connected = true;
                console.log('WebSocket Connected');
                
                // Subscribe to presence updates
                this.subscribeToPresence();
                
                // Start heartbeat to keep connection alive
                this.startHeartbeat();
                
                if (onConnect) onConnect();
            },
            onStompError: (frame) => {
                console.error('STOMP Error:', frame);
                this.connected = false;
                this.stopHeartbeat();
                if (onError) onError(frame);
            },
            onWebSocketClose: () => {
                this.connected = false;
                this.stopHeartbeat();
                console.log('WebSocket Disconnected');
            },
        });

        this.client.activate();
    }

    disconnect() {
        if (this.client) {
            this.stopHeartbeat();
            this.client.deactivate();
            this.connected = false;
            this.subscriptions.clear();
            this.presenceCallbacks = [];
        }
    }

    subscribe(destination, callback) {
        if (!this.client || !this.connected) {
            console.error('Not connected to WebSocket');
            return null;
        }

        const subscription = this.client.subscribe(destination, (message) => {
            try {
                const data = JSON.parse(message.body);
                callback(data);
            } catch (error) {
                console.error('Error parsing message:', error);
                callback(message.body);
            }
        });

        this.subscriptions.set(destination, subscription);
        return subscription;
    }

    unsubscribe(destination) {
        const subscription = this.subscriptions.get(destination);
        if (subscription) {
            subscription.unsubscribe();
            this.subscriptions.delete(destination);
        }
    }

    sendMessage(destination, body) {
        if (!this.client || !this.connected) {
            console.error('Not connected to WebSocket');
            return;
        }

        this.client.publish({
            destination,
            body: JSON.stringify(body),
        });
    }

    isConnected() {
        return this.connected;
    }

    // Presence tracking methods
    subscribeToPresence() {
        if (!this.client || !this.connected) {
            return;
        }

        // Subscribe to presence updates from friends
        this.subscribe('/user/queue/presence', (data) => {
            console.log('Presence update:', data);
            // Notify all registered callbacks
            this.presenceCallbacks.forEach(callback => callback(data));
        });

        // Subscribe to friends presence list
        this.subscribe('/user/queue/friends-presence', (data) => {
            console.log('Friends presence:', data);
            this.presenceCallbacks.forEach(callback => callback(data, true));
        });

        // Request initial friends presence
        this.sendMessage('/app/presence.getFriends', {});
    }

    onPresenceUpdate(callback) {
        this.presenceCallbacks.push(callback);
    }

    startHeartbeat() {
        // Send heartbeat every 30 seconds to keep connection alive and presence updated
        this.heartbeatInterval = setInterval(() => {
            if (this.connected) {
                this.sendMessage('/app/presence.heartbeat', {});
            }
        }, 30000);
    }

    stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }
}

// Export singleton instance
const websocketClient = new WebSocketClient();
export default websocketClient;
