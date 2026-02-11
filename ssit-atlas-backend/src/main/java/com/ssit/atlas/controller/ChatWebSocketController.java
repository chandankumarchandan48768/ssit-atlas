package com.ssit.atlas.controller;

import com.ssit.atlas.dto.ChatMessageDto;
import com.ssit.atlas.model.ChatMessage;
import com.ssit.atlas.model.ChatMessage.MessageType;
import com.ssit.atlas.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.Map;

@Controller
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatWebSocketController(SimpMessagingTemplate messagingTemplate,
            ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload Map<String, Object> message, Principal principal) {
        if (principal == null) {
            System.err.println("Principal is null - user not authenticated");
            return;
        }

        String senderId = principal.getName();
        String receiverId = (String) message.get("receiverId");
        String content = (String) message.get("content");
        String typeStr = (String) message.get("messageType");

        if (receiverId == null || content == null) {
            System.err.println("Invalid message - missing receiverId or content");
            return;
        }

        MessageType messageType = MessageType.TEXT;
        if (typeStr != null) {
            try {
                messageType = MessageType.valueOf(typeStr);
            } catch (IllegalArgumentException e) {
                messageType = MessageType.TEXT;
            }
        }

        try {
            // Save message to database
            ChatMessage chatMessage = chatService.sendMessage(senderId, receiverId, content, messageType);

            // Send to receiver via WebSocket
            messagingTemplate.convertAndSendToUser(
                    receiverId,
                    "/queue/messages",
                    chatMessage);

            // Send acknowledgment back to sender with delivery status
            Map<String, Object> ack = Map.of(
                    "status", "delivered",
                    "message", chatMessage,
                    "timestamp", System.currentTimeMillis());

            messagingTemplate.convertAndSendToUser(
                    senderId,
                    "/queue/message-ack",
                    ack);

        } catch (Exception e) {
            System.err.println("Failed to send message: " + e.getMessage());

            // Send error back to sender
            Map<String, Object> error = Map.of(
                    "status", "error",
                    "error", e.getMessage(),
                    "timestamp", System.currentTimeMillis());

            messagingTemplate.convertAndSendToUser(
                    senderId,
                    "/queue/message-error",
                    error);
        }
    }

    @MessageMapping("/chat.typing")
    public void handleTypingIndicator(@Payload Map<String, Object> payload, Principal principal) {
        if (principal == null) {
            return;
        }

        String senderId = principal.getName();
        String receiverId = (String) payload.get("receiverId");
        boolean typing = (boolean) payload.getOrDefault("typing", false);

        if (receiverId == null) {
            return;
        }

        Map<String, Object> typingNotification = Map.of(
                "senderId", senderId,
                "typing", typing);

        messagingTemplate.convertAndSendToUser(
                receiverId,
                "/queue/typing",
                typingNotification);
    }
}
