package com.ssit.atlas.controller;

import com.ssit.atlas.dto.ChatMessageDto;
import com.ssit.atlas.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/{friendId}/history")
    public ResponseEntity<List<ChatMessageDto>> getChatHistory(
            @PathVariable String friendId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            Authentication auth) {
        String userId = auth.getName();
        List<ChatMessageDto> messages = chatService.getChatHistory(userId, friendId, page, size);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/{friendId}/read")
    public ResponseEntity<Void> markMessagesAsRead(
            @PathVariable String friendId,
            Authentication auth) {
        String userId = auth.getName();
        String chatRoomId = chatService.createChatRoomId(userId, friendId);
        chatService.markMessagesAsRead(chatRoomId, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/unread")
    public ResponseEntity<Map<String, Long>> getUnreadCount(Authentication auth) {
        String userId = auth.getName();
        long count = chatService.getUnreadCount(userId);
        return ResponseEntity.ok(Map.of("count", count));
    }
}
