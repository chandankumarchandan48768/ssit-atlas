package com.ssit.atlas.service;

import com.ssit.atlas.dto.ChatMessageDto;
import com.ssit.atlas.model.ChatMessage;
import com.ssit.atlas.model.ChatMessage.MessageStatus;
import com.ssit.atlas.model.ChatMessage.MessageType;
import com.ssit.atlas.model.User;
import com.ssit.atlas.repository.ChatMessageRepository;
import com.ssit.atlas.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final FriendService friendService;

    public ChatService(ChatMessageRepository chatMessageRepository,
            UserRepository userRepository,
            FriendService friendService) {
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
        this.friendService = friendService;
    }

    public ChatMessage sendMessage(String senderId, String receiverId, String content, MessageType messageType) {
        // Verify users are friends
        if (!friendService.areFriends(senderId, receiverId)) {
            throw new IllegalArgumentException("Can only send messages to friends");
        }

        String chatRoomId = createChatRoomId(senderId, receiverId);

        ChatMessage message = ChatMessage.builder()
                .chatRoomId(chatRoomId)
                .senderId(senderId)
                .receiverId(receiverId)
                .content(content)
                .messageType(messageType != null ? messageType : MessageType.TEXT)
                .status(MessageStatus.SENT)
                .timestamp(LocalDateTime.now())
                .build();

        return chatMessageRepository.save(message);
    }

    public List<ChatMessageDto> getChatHistory(String userId, String friendId, int page, int size) {
        // Verify users are friends
        if (!friendService.areFriends(userId, friendId)) {
            throw new IllegalArgumentException("Can only view chat history with friends");
        }

        String chatRoomId = createChatRoomId(userId, friendId);
        Pageable pageable = PageRequest.of(page, size);

        List<ChatMessage> messages = chatMessageRepository.findByChatRoomIdOrderByTimestampDesc(chatRoomId, pageable);

        // Convert to DTOs
        return messages.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void markMessagesAsRead(String chatRoomId, String userId) {
        List<ChatMessage> unreadMessages = chatMessageRepository
                .findByChatRoomIdAndReceiverIdAndStatus(chatRoomId, userId, MessageStatus.SENT);

        for (ChatMessage message : unreadMessages) {
            message.setStatus(MessageStatus.READ);
        }

        chatMessageRepository.saveAll(unreadMessages);
    }

    public long getUnreadCount(String userId) {
        return chatMessageRepository.countByReceiverIdAndStatusNot(userId, MessageStatus.READ);
    }

    public String createChatRoomId(String userId1, String userId2) {
        // Create deterministic chat room ID by sorting user IDs
        String[] ids = { userId1, userId2 };
        java.util.Arrays.sort(ids);
        return ids[0] + "_" + ids[1];
    }

    private ChatMessageDto convertToDto(ChatMessage message) {
        ChatMessageDto dto = new ChatMessageDto();
        dto.setId(message.getId());
        dto.setSenderId(message.getSenderId());
        dto.setReceiverId(message.getReceiverId());
        dto.setContent(message.getContent());
        dto.setMessageType(message.getMessageType());
        dto.setStatus(message.getStatus().toString());
        dto.setTimestamp(message.getTimestamp());

        // Get sender and receiver names
        User sender = userRepository.findById(message.getSenderId()).orElse(null);
        User receiver = userRepository.findById(message.getReceiverId()).orElse(null);

        if (sender != null) {
            dto.setSenderName(sender.getName());
        }
        if (receiver != null) {
            dto.setReceiverName(receiver.getName());
        }

        // Convert location data if present
        if (message.getLocationData() != null) {
            ChatMessageDto.LocationDataDto locationDto = new ChatMessageDto.LocationDataDto();
            locationDto.setLatitude(message.getLocationData().getLatitude());
            locationDto.setLongitude(message.getLocationData().getLongitude());
            locationDto.setLocationName(message.getLocationData().getLocationName());
            locationDto.setNodeId(message.getLocationData().getNodeId());
            dto.setLocationData(locationDto);
        }

        return dto;
    }
}
