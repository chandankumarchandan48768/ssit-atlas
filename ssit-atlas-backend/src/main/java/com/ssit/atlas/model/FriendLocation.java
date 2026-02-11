package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "friend_locations")
public class FriendLocation {
    @Id
    private String id;
    private String userId;
    private String nodeId;
    private LocalDateTime lastUpdated;
    private Visibility visibility;

    // New fields for location sharing
    private java.util.List<String> sharedWithUserIds; // Users who can see this location
    private Double latitude;
    private Double longitude;
    private String locationName; // Human-readable location name

    public enum Visibility {
        VISIBLE, HIDDEN
    }

    public FriendLocation() {
    }

    public FriendLocation(String id, String userId, String nodeId, LocalDateTime lastUpdated, Visibility visibility) {
        this.id = id;
        this.userId = userId;
        this.nodeId = nodeId;
        this.lastUpdated = lastUpdated;
        this.visibility = visibility;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Visibility getVisibility() {
        return visibility;
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility;
    }

    public java.util.List<String> getSharedWithUserIds() {
        return sharedWithUserIds;
    }

    public void setSharedWithUserIds(java.util.List<String> sharedWithUserIds) {
        this.sharedWithUserIds = sharedWithUserIds;
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

    public static FriendLocationBuilder builder() {
        return new FriendLocationBuilder();
    }

    public static class FriendLocationBuilder {
        private String id;
        private String userId;
        private String nodeId;
        private LocalDateTime lastUpdated;
        private Visibility visibility;

        FriendLocationBuilder() {
        }

        public FriendLocationBuilder id(String id) {
            this.id = id;
            return this;
        }

        public FriendLocationBuilder userId(String userId) {
            this.userId = userId;
            return this;
        }

        public FriendLocationBuilder nodeId(String nodeId) {
            this.nodeId = nodeId;
            return this;
        }

        public FriendLocationBuilder lastUpdated(LocalDateTime lastUpdated) {
            this.lastUpdated = lastUpdated;
            return this;
        }

        public FriendLocationBuilder visibility(Visibility visibility) {
            this.visibility = visibility;
            return this;
        }

        public FriendLocation build() {
            return new FriendLocation(id, userId, nodeId, lastUpdated, visibility);
        }
    }
}
