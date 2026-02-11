package com.ssit.atlas.service;

import com.ssit.atlas.dto.FriendDto;
import com.ssit.atlas.dto.UserDto;
import com.ssit.atlas.model.FriendRequest;
import com.ssit.atlas.model.FriendRequest.RequestStatus;
import com.ssit.atlas.model.Friendship;
import com.ssit.atlas.model.User;
import com.ssit.atlas.model.UserPresence;
import com.ssit.atlas.repository.FriendRequestRepository;
import com.ssit.atlas.repository.FriendshipRepository;
import com.ssit.atlas.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendService {

    private final FriendRequestRepository friendRequestRepository;
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;
    private final PresenceService presenceService;

    public FriendService(FriendRequestRepository friendRequestRepository,
            FriendshipRepository friendshipRepository,
            UserRepository userRepository,
            PresenceService presenceService) {
        this.friendRequestRepository = friendRequestRepository;
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
        this.presenceService = presenceService;
    }

    @Transactional
    public FriendRequest sendFriendRequest(String senderId, String receiverId) {
        // Validate users exist
        if (!userRepository.existsById(senderId) || !userRepository.existsById(receiverId)) {
            throw new IllegalArgumentException("User not found");
        }

        // Check if users are themselves
        if (senderId.equals(receiverId)) {
            throw new IllegalArgumentException("Cannot send friend request to yourself");
        }

        // Check if already friends
        if (areFriends(senderId, receiverId)) {
            throw new IllegalArgumentException("Users are already friends");
        }

        // Check if request already exists
        if (friendRequestRepository.findBySenderIdAndReceiverId(senderId, receiverId).isPresent()) {
            throw new IllegalArgumentException("Friend request already sent");
        }

        // Check for reverse request (receiver already sent to sender)
        if (friendRequestRepository.findBySenderIdAndReceiverId(receiverId, senderId).isPresent()) {
            throw new IllegalArgumentException("This user has already sent you a friend request");
        }

        FriendRequest request = FriendRequest.builder()
                .senderId(senderId)
                .receiverId(receiverId)
                .status(RequestStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return friendRequestRepository.save(request);
    }

    @Transactional
    public void acceptFriendRequest(String requestId, String userId) {
        FriendRequest request = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found"));

        if (!request.getReceiverId().equals(userId)) {
            throw new IllegalArgumentException("Not authorized to accept this request");
        }

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new IllegalArgumentException("Request is not pending");
        }

        // Update request status
        request.setStatus(RequestStatus.ACCEPTED);
        request.setUpdatedAt(LocalDateTime.now());
        friendRequestRepository.save(request);

        // Create friendship
        createFriendship(request.getSenderId(), request.getReceiverId());
    }

    @Transactional
    public void rejectFriendRequest(String requestId, String userId) {
        FriendRequest request = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found"));

        if (!request.getReceiverId().equals(userId)) {
            throw new IllegalArgumentException("Not authorized to reject this request");
        }

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new IllegalArgumentException("Request is not pending");
        }

        request.setStatus(RequestStatus.REJECTED);
        request.setUpdatedAt(LocalDateTime.now());
        friendRequestRepository.save(request);
    }

    public List<FriendRequest> getPendingRequests(String userId) {
        return friendRequestRepository.findByReceiverIdAndStatus(userId, RequestStatus.PENDING);
    }

    public List<FriendDto> getFriendsList(String userId) {
        List<Friendship> friendships = friendshipRepository.findByUser1IdOrUser2Id(userId);
        List<FriendDto> friends = new ArrayList<>();

        for (Friendship friendship : friendships) {
            String friendId = friendship.getUser1Id().equals(userId)
                    ? friendship.getUser2Id()
                    : friendship.getUser1Id();

            User friendUser = userRepository.findById(friendId).orElse(null);
            if (friendUser != null) {
                FriendDto dto = new FriendDto();
                dto.setUserId(friendUser.getId());
                dto.setName(friendUser.getName());
                dto.setEmail(friendUser.getEmail());
                dto.setProfilePhotoUrl(friendUser.getProfilePhotoUrl());
                dto.setStatus(friendUser.getStatus());

                // Get online status
                var presence = presenceService.getPresence(friendId);
                dto.setOnline(presence.getStatus() == UserPresence.PresenceStatus.ONLINE);
                dto.setLastSeenAt(presence.getLastSeenAt());

                friends.add(dto);
            }
        }

        return friends;
    }

    public List<UserDto> searchUsers(String query, String currentUserId) {
        List<User> allUsers = userRepository.findAll();
        List<String> friendIds = getFriendIds(currentUserId);

        return allUsers.stream()
                .filter(user -> !user.getId().equals(currentUserId))
                .filter(user -> !friendIds.contains(user.getId()))
                .filter(user -> user.getName().toLowerCase().contains(query.toLowerCase()) ||
                        user.getEmail().toLowerCase().contains(query.toLowerCase()))
                .map(UserDto::fromUser)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeFriend(String userId, String friendId) {
        if (!areFriends(userId, friendId)) {
            throw new IllegalArgumentException("Users are not friends");
        }

        String user1 = userId.compareTo(friendId) < 0 ? userId : friendId;
        String user2 = userId.compareTo(friendId) < 0 ? friendId : userId;

        friendshipRepository.deleteByUser1IdAndUser2Id(user1, user2);
    }

    public boolean areFriends(String userId1, String userId2) {
        String user1 = userId1.compareTo(userId2) < 0 ? userId1 : userId2;
        String user2 = userId1.compareTo(userId2) < 0 ? userId2 : userId1;
        return friendshipRepository.existsByUser1IdAndUser2Id(user1, user2);
    }

    private void createFriendship(String userId1, String userId2) {
        // Always store in alphabetical order
        String user1 = userId1.compareTo(userId2) < 0 ? userId1 : userId2;
        String user2 = userId1.compareTo(userId2) < 0 ? userId2 : userId1;

        Friendship friendship = Friendship.builder()
                .user1Id(user1)
                .user2Id(user2)
                .createdAt(LocalDateTime.now())
                .build();

        friendshipRepository.save(friendship);
    }

    public List<String> getFriendIds(String userId) {
        List<Friendship> friendships = friendshipRepository.findByUser1IdOrUser2Id(userId);
        return friendships.stream()
                .map(f -> f.getUser1Id().equals(userId) ? f.getUser2Id() : f.getUser1Id())
                .collect(Collectors.toList());
    }
}
