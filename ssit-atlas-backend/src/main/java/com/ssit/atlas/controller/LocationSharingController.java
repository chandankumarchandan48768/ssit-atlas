package com.ssit.atlas.controller;

import com.ssit.atlas.model.FriendLocation;
import com.ssit.atlas.service.LocationSharingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/location-sharing")
public class LocationSharingController {

    private final LocationSharingService locationSharingService;

    public LocationSharingController(LocationSharingService locationSharingService) {
        this.locationSharingService = locationSharingService;
    }

    @PostMapping("/share/{friendId}")
    public ResponseEntity<FriendLocation> shareLocation(
            @PathVariable String friendId,
            @RequestBody Map<String, Object> locationData,
            Authentication auth) {
        String userId = auth.getName();
        String nodeId = (String) locationData.get("nodeId");
        Double latitude = ((Number) locationData.get("latitude")).doubleValue();
        Double longitude = ((Number) locationData.get("longitude")).doubleValue();
        String locationName = (String) locationData.get("locationName");

        FriendLocation location = locationSharingService.shareLocationWithFriend(
                userId, friendId, nodeId, latitude, longitude, locationName);
        return ResponseEntity.ok(location);
    }

    @DeleteMapping("/share/{friendId}")
    public ResponseEntity<Void> stopSharing(
            @PathVariable String friendId,
            Authentication auth) {
        String userId = auth.getName();
        locationSharingService.stopSharingWithFriend(userId, friendId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/shared")
    public ResponseEntity<List<FriendLocation>> getSharedLocations(Authentication auth) {
        String userId = auth.getName();
        List<FriendLocation> locations = locationSharingService.getSharedLocations(userId);
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/my-location")
    public ResponseEntity<FriendLocation> getMyLocation(Authentication auth) {
        String userId = auth.getName();
        FriendLocation location = locationSharingService.getMyLocation(userId);
        return ResponseEntity.ok(location);
    }
}
