package com.ssit.atlas.config;

import com.ssit.atlas.service.FriendService;
import com.ssit.atlas.service.PresenceService;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Component
public class WebSocketEventListener {

    private final PresenceService presenceService;
    private final FriendService friendService;
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketEventListener(
            PresenceService presenceService,
            FriendService friendService,
            SimpMessagingTemplate messagingTemplate) {
        this.presenceService = presenceService;
        this.friendService = friendService;
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal user = headerAccessor.getUser();

        if (user != null) {
            String userId = user.getName();
            System.out.println("User connected: " + userId);

            // Mark user as online
            presenceService.markOnline(userId);

            // Notify friends that user is online
            broadcastPresenceToFriends(userId, true);
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal user = headerAccessor.getUser();

        if (user != null) {
            String userId = user.getName();
            System.out.println("User disconnected: " + userId);

            // Mark user as offline
            presenceService.markOffline(userId);

            // Notify friends that user is offline
            broadcastPresenceToFriends(userId, false);
        }
    }

    private void broadcastPresenceToFriends(String userId, boolean isOnline) {
        try {
            // Get user's friends
            List<String> friendIds = friendService.getFriendIds(userId);

            // Create presence notification
            Map<String, Object> presenceUpdate = Map.of(
                    "userId", userId,
                    "online", isOnline,
                    "timestamp", System.currentTimeMillis());

            // Send to each friend
            for (String friendId : friendIds) {
                messagingTemplate.convertAndSendToUser(
                        friendId,
                        "/queue/presence",
                        presenceUpdate);
            }
        } catch (Exception e) {
            System.err.println("Failed to broadcast presence: " + e.getMessage());
        }
    }
}
