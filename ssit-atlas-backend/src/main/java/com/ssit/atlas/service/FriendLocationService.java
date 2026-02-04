package com.ssit.atlas.service;

import com.ssit.atlas.model.FriendLocation;
import com.ssit.atlas.repository.FriendLocationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FriendLocationService {
    private final FriendLocationRepository locationRepository;

    public FriendLocationService(FriendLocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public void updateLocation(String userId, String nodeId, FriendLocation.Visibility visibility) {
        Optional<FriendLocation> existing = locationRepository.findByUserId(userId);
        FriendLocation location;
        if (existing.isPresent()) {
            location = existing.get();
        } else {
            location = FriendLocation.builder().userId(userId).build();
        }

        location.setNodeId(nodeId);
        location.setVisibility(visibility);
        location.setLastUpdated(LocalDateTime.now());

        locationRepository.save(location);
    }

    public List<FriendLocation> getVisibleFriends() {
        // In a real app, filtering by user's friend list would happen here.
        // For now, return all visible locations.
        return locationRepository.findByVisibility(FriendLocation.Visibility.VISIBLE);
    }
}
