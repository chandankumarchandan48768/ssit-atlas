package com.ssit.atlas.controller;

import com.ssit.atlas.model.UserPresence;
import com.ssit.atlas.service.FriendService;
import com.ssit.atlas.service.PresenceService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class PresenceWebSocketController {

    private final PresenceService presenceService;
    private final FriendService friendService;
    private final SimpMessagingTemplate messagingTemplate;

    public PresenceWebSocketController(
            PresenceService presenceService,
            FriendService friendService,
            SimpMessagingTemplate messagingTemplate) {
        this.presenceService = presenceService;
        this.friendService = friendService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/presence.heartbeat")
    public void handleHeartbeat(Principal principal) {
        if (principal != null) {
            String userId = principal.getName();
            presenceService.heartbeat(userId);
        }
    }

    @MessageMapping("/presence.getFriends")
    public void getFriendsPresence(Principal principal) {
        if (principal != null) {
            String userId = principal.getName();
            List<String> friendIds = friendService.getFriendIds(userId);

            Map<String, UserPresence> presenceMap = presenceService.getFriendsPresence(friendIds);

            // Convert to simple format
            Map<String, Object> response = presenceMap.entrySet().stream()
                    .collect(Collectors.toMap(
                            Map.Entry::getKey,
                            e -> Map.of(
                                    "online", e.getValue().getStatus() == UserPresence.PresenceStatus.ONLINE,
                                    "lastSeenAt", e.getValue().getLastSeenAt())));

            messagingTemplate.convertAndSendToUser(
                    userId,
                    "/queue/friends-presence",
                    response);
        }
    }
}
