package com.ssit.atlas.repository;

import com.ssit.atlas.model.ChatMessage;
import com.ssit.atlas.model.ChatMessage.MessageStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findByChatRoomIdOrderByTimestampDesc(String chatRoomId, Pageable pageable);

    List<ChatMessage> findByChatRoomIdAndTimestampAfter(String chatRoomId, LocalDateTime timestamp);

    long countByReceiverIdAndStatusNot(String receiverId, MessageStatus status);

    List<ChatMessage> findByReceiverIdAndStatus(String receiverId, MessageStatus status);

    List<ChatMessage> findByChatRoomIdAndReceiverIdAndStatus(String chatRoomId, String receiverId,
            MessageStatus status);
}
