package com.ssit.atlas.repository;

import com.ssit.atlas.model.FriendRequest;
import com.ssit.atlas.model.FriendRequest.RequestStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {

    List<FriendRequest> findByReceiverIdAndStatus(String receiverId, RequestStatus status);

    List<FriendRequest> findBySenderId(String senderId);

    Optional<FriendRequest> findBySenderIdAndReceiverId(String senderId, String receiverId);

    List<FriendRequest> findByReceiverId(String receiverId);
}
