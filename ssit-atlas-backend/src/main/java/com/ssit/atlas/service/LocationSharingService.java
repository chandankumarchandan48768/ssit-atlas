package com.ssit.atlas.service;

import com.ssit.atlas.model.FriendLocation;
import com.ssit.atlas.repository.FriendLocationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LocationSharingService {

    private final FriendLocationRepository friendLocationRepository;
    private final FriendService friendService;

    public LocationSharingService(FriendLocationRepository friendLocationRepository,
            FriendService friendService) {
        this.friendLocationRepository = friendLocationRepository;
        this.friendService = friendService;
    }

    public FriendLocation shareLocationWithFriend(String userId, String friendId, String nodeId,
            Double latitude, Double longitude, String locationName) {
        // Verify friendship
        if (!friendService.areFriends(userId, friendId)) {
            throw new IllegalArgumentException("Can only share location with friends");
        }

        FriendLocation location = friendLocationRepository.findByUserId(userId)
                .orElse(new FriendLocation());

        location.setUserId(userId);
        location.setNodeId(nodeId);
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        location.setLocationName(locationName);
        location.setLastUpdated(LocalDateTime.now());
        location.setVisibility(FriendLocation.Visibility.VISIBLE);

        // Add friend to shared list if not already there
        List<String> sharedWith = location.getSharedWithUserIds();
        if (sharedWith == null) {
            sharedWith = new java.util.ArrayList<>();
        }
        if (!sharedWith.contains(friendId)) {
            sharedWith.add(friendId);
        }
        location.setSharedWithUserIds(sharedWith);

        return friendLocationRepository.save(location);
    }

    public void stopSharingWithFriend(String userId, String friendId) {
        FriendLocation location = friendLocationRepository.findByUserId(userId).orElse(null);
        if (location != null && location.getSharedWithUserIds() != null) {
            location.getSharedWithUserIds().remove(friendId);
            friendLocationRepository.save(location);
        }
    }

    public List<FriendLocation> getSharedLocations(String userId) {
        // Get all friends' locations that are shared with this user
        return friendLocationRepository.findAll().stream()
                .filter(loc -> loc.getSharedWithUserIds() != null &&
                        loc.getSharedWithUserIds().contains(userId))
                .toList();
    }

    public FriendLocation getMyLocation(String userId) {
        return friendLocationRepository.findByUserId(userId).orElse(null);
    }
}
