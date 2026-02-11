package com.ssit.atlas.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "friend_requests")
@CompoundIndexes({
        @CompoundIndex(name = "receiver_status_idx", def = "{'receiverId': 1, 'status': 1}"),
        @CompoundIndex(name = "sender_receiver_idx", def = "{'senderId': 1, 'receiverId': 1}", unique = true)
})
public class FriendRequest {
    @Id
    private String id;
    private String senderId;
    private String receiverId;
    private RequestStatus status;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public enum RequestStatus {
        PENDING, ACCEPTED, REJECTED
    }

    public FriendRequest() {
        this.status = RequestStatus.PENDING;
    }

    public FriendRequest(String id, String senderId, String receiverId, RequestStatus status,
            LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static FriendRequestBuilder builder() {
        return new FriendRequestBuilder();
    }

    public static class FriendRequestBuilder {
        private String id;
        private String senderId;
        private String receiverId;
        private RequestStatus status = RequestStatus.PENDING;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        FriendRequestBuilder() {
        }

        public FriendRequestBuilder id(String id) {
            this.id = id;
            return this;
        }

        public FriendRequestBuilder senderId(String senderId) {
            this.senderId = senderId;
            return this;
        }

        public FriendRequestBuilder receiverId(String receiverId) {
            this.receiverId = receiverId;
            return this;
        }

        public FriendRequestBuilder status(RequestStatus status) {
            this.status = status;
            return this;
        }

        public FriendRequestBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public FriendRequestBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public FriendRequest build() {
            return new FriendRequest(id, senderId, receiverId, status, createdAt, updatedAt);
        }
    }
}
