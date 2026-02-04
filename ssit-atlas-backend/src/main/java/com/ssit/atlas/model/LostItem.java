package com.ssit.atlas.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "lost_items")
public class LostItem {
    @Id
    private String id;
    private String title;
    private String description;
    private String imageUrl;
    private String lastSeenNodeId;
    private ItemStatus status;
    private String postedByUserId;

    @CreatedDate
    private LocalDateTime createdAt;

    public enum ItemStatus {
        LOST, FOUND, RETURNED
    }

    public LostItem() {
    }

    public LostItem(String id, String title, String description, String imageUrl, String lastSeenNodeId,
            ItemStatus status, String postedByUserId, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.lastSeenNodeId = lastSeenNodeId;
        this.status = status;
        this.postedByUserId = postedByUserId;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLastSeenNodeId() {
        return lastSeenNodeId;
    }

    public void setLastSeenNodeId(String lastSeenNodeId) {
        this.lastSeenNodeId = lastSeenNodeId;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }

    public String getPostedByUserId() {
        return postedByUserId;
    }

    public void setPostedByUserId(String postedByUserId) {
        this.postedByUserId = postedByUserId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static LostItemBuilder builder() {
        return new LostItemBuilder();
    }

    public static class LostItemBuilder {
        private String id;
        private String title;
        private String description;
        private String imageUrl;
        private String lastSeenNodeId;
        private ItemStatus status;
        private String postedByUserId;
        private LocalDateTime createdAt;

        LostItemBuilder() {
        }

        public LostItemBuilder id(String id) {
            this.id = id;
            return this;
        }

        public LostItemBuilder title(String title) {
            this.title = title;
            return this;
        }

        public LostItemBuilder description(String description) {
            this.description = description;
            return this;
        }

        public LostItemBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public LostItemBuilder lastSeenNodeId(String lastSeenNodeId) {
            this.lastSeenNodeId = lastSeenNodeId;
            return this;
        }

        public LostItemBuilder status(ItemStatus status) {
            this.status = status;
            return this;
        }

        public LostItemBuilder postedByUserId(String postedByUserId) {
            this.postedByUserId = postedByUserId;
            return this;
        }

        public LostItemBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public LostItem build() {
            return new LostItem(id, title, description, imageUrl, lastSeenNodeId, status, postedByUserId, createdAt);
        }
    }
}
