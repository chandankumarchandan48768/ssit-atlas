package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "chat_messages")
@CompoundIndex(name = "chatroom_timestamp_idx", def = "{'chatRoomId': 1, 'timestamp': -1}")
public class ChatMessage {
    @Id
    private String id;

    @Indexed
    private String chatRoomId;
    private String senderId;
    private String receiverId;
    private String content;
    private MessageType messageType;
    private LocationData locationData;
    private MessageStatus status;
    private LocalDateTime timestamp;

    public enum MessageType {
        TEXT, LOCATION_SHARE, IMAGE
    }

    public enum MessageStatus {
        SENT, DELIVERED, READ
    }

    public static class LocationData {
        private Double latitude;
        private Double longitude;
        private String locationName;
        private String nodeId;

        public LocationData() {
        }

        public LocationData(Double latitude, Double longitude, String locationName, String nodeId) {
            this.latitude = latitude;
            this.longitude = longitude;
            this.locationName = locationName;
            this.nodeId = nodeId;
        }

        public Double getLatitude() {
            return latitude;
        }

        public void setLatitude(Double latitude) {
            this.latitude = latitude;
        }

        public Double getLongitude() {
            return longitude;
        }

        public void setLongitude(Double longitude) {
            this.longitude = longitude;
        }

        public String getLocationName() {
            return locationName;
        }

        public void setLocationName(String locationName) {
            this.locationName = locationName;
        }

        public String getNodeId() {
            return nodeId;
        }

        public void setNodeId(String nodeId) {
            this.nodeId = nodeId;
        }
    }

    public ChatMessage() {
        this.messageType = MessageType.TEXT;
        this.status = MessageStatus.SENT;
        this.timestamp = LocalDateTime.now();
    }

    public ChatMessage(String id, String chatRoomId, String senderId, String receiverId,
            String content, MessageType messageType, LocationData locationData,
            MessageStatus status, LocalDateTime timestamp) {
        this.id = id;
        this.chatRoomId = chatRoomId;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.messageType = messageType;
        this.locationData = locationData;
        this.status = status;
        this.timestamp = timestamp;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getChatRoomId() {
        return chatRoomId;
    }

    public void setChatRoomId(String chatRoomId) {
        this.chatRoomId = chatRoomId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public LocationData getLocationData() {
        return locationData;
    }

    public void setLocationData(LocationData locationData) {
        this.locationData = locationData;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public static ChatMessageBuilder builder() {
        return new ChatMessageBuilder();
    }

    public static class ChatMessageBuilder {
        private String id;
        private String chatRoomId;
        private String senderId;
        private String receiverId;
        private String content;
        private MessageType messageType = MessageType.TEXT;
        private LocationData locationData;
        private MessageStatus status = MessageStatus.SENT;
        private LocalDateTime timestamp = LocalDateTime.now();

        ChatMessageBuilder() {
        }

        public ChatMessageBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ChatMessageBuilder chatRoomId(String chatRoomId) {
            this.chatRoomId = chatRoomId;
            return this;
        }

        public ChatMessageBuilder senderId(String senderId) {
            this.senderId = senderId;
            return this;
        }

        public ChatMessageBuilder receiverId(String receiverId) {
            this.receiverId = receiverId;
            return this;
        }

        public ChatMessageBuilder content(String content) {
            this.content = content;
            return this;
        }

        public ChatMessageBuilder messageType(MessageType messageType) {
            this.messageType = messageType;
            return this;
        }

        public ChatMessageBuilder locationData(LocationData locationData) {
            this.locationData = locationData;
            return this;
        }

        public ChatMessageBuilder status(MessageStatus status) {
            this.status = status;
            return this;
        }

        public ChatMessageBuilder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public ChatMessage build() {
            return new ChatMessage(id, chatRoomId, senderId, receiverId, content,
                    messageType, locationData, status, timestamp);
        }
    }
}
