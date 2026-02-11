package com.ssit.atlas.service;

import com.ssit.atlas.model.UserPresence;
import com.ssit.atlas.model.UserPresence.PresenceStatus;
import com.ssit.atlas.repository.UserPresenceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PresenceService {

    private final UserPresenceRepository userPresenceRepository;

    public PresenceService(UserPresenceRepository userPresenceRepository) {
        this.userPresenceRepository = userPresenceRepository;
    }

    public void markOnline(String userId) {
        UserPresence presence = userPresenceRepository.findByUserId(userId)
                .orElse(new UserPresence());

        presence.setUserId(userId);
        presence.setStatus(PresenceStatus.ONLINE);
        presence.setLastSeenAt(LocalDateTime.now());

        userPresenceRepository.save(presence);
    }

    public void markOffline(String userId) {
        UserPresence presence = userPresenceRepository.findByUserId(userId)
                .orElse(new UserPresence());

        presence.setUserId(userId);
        presence.setStatus(PresenceStatus.OFFLINE);
        presence.setLastSeenAt(LocalDateTime.now());

        userPresenceRepository.save(presence);
    }

    public UserPresence getPresence(String userId) {
        return userPresenceRepository.findByUserId(userId)
                .orElse(UserPresence.builder()
                        .userId(userId)
                        .status(PresenceStatus.OFFLINE)
                        .lastSeenAt(LocalDateTime.now())
                        .build());
    }

    public Map<String, UserPresence> getFriendsPresence(List<String> friendIds) {
        List<UserPresence> presences = userPresenceRepository.findByUserIdIn(friendIds);
        return presences.stream()
                .collect(Collectors.toMap(UserPresence::getUserId, p -> p));
    }

    public void heartbeat(String userId) {
        markOnline(userId); // Simply update the timestamp
    }
}
