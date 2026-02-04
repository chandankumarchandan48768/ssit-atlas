package com.ssit.atlas.controller;

import com.ssit.atlas.dto.LocationUpdateRequest;
import com.ssit.atlas.model.FriendLocation;
import com.ssit.atlas.service.FriendLocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendLocationController {

    private final FriendLocationService friendLocationService;

    public FriendLocationController(FriendLocationService friendLocationService) {
        this.friendLocationService = friendLocationService;
    }

    @PostMapping("/location")
    public ResponseEntity<Void> updateLocation(@RequestBody LocationUpdateRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName();

        friendLocationService.updateLocation(userId, request.getNodeId(), request.getVisibility());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/visible")
    public List<FriendLocation> getVisibleFriends() {
        return friendLocationService.getVisibleFriends();
    }
}
