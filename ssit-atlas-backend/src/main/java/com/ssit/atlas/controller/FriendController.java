package com.ssit.atlas.controller;

import com.ssit.atlas.dto.FriendDto;
import com.ssit.atlas.dto.FriendRequestDto;
import com.ssit.atlas.dto.UserDto;
import com.ssit.atlas.model.FriendRequest;
import com.ssit.atlas.model.User;
import com.ssit.atlas.service.FriendService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendController {

    private final FriendService friendService;

    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @PostMapping("/request")
    public ResponseEntity<FriendRequest> sendFriendRequest(
            @Valid @RequestBody FriendRequestDto request,
            Authentication auth) {
        String senderId = auth.getName();
        FriendRequest friendRequest = friendService.sendFriendRequest(senderId, request.getReceiverId());
        return ResponseEntity.ok(friendRequest);
    }

    @PostMapping("/request/{id}/accept")
    public ResponseEntity<Void> acceptFriendRequest(@PathVariable String id, Authentication auth) {
        String userId = auth.getName();
        friendService.acceptFriendRequest(id, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/request/{id}/reject")
    public ResponseEntity<Void> rejectFriendRequest(@PathVariable String id, Authentication auth) {
        String userId = auth.getName();
        friendService.rejectFriendRequest(id, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/requests")
    public ResponseEntity<List<FriendRequest>> getPendingRequests(Authentication auth) {
        String userId = auth.getName();
        List<FriendRequest> requests = friendService.getPendingRequests(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping
    public ResponseEntity<List<FriendDto>> getFriendsList(Authentication auth) {
        String userId = auth.getName();
        List<FriendDto> friends = friendService.getFriendsList(userId);
        return ResponseEntity.ok(friends);
    }

    @DeleteMapping("/{friendId}")
    public ResponseEntity<Void> removeFriend(@PathVariable String friendId, Authentication auth) {
        String userId = auth.getName();
        friendService.removeFriend(userId, friendId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam String query, Authentication auth) {
        String userId = auth.getName();
        List<UserDto> users = friendService.searchUsers(query, userId);
        return ResponseEntity.ok(users);
    }
}
