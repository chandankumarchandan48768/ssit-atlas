package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "user_presence")
public class UserPresence {
    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

    private PresenceStatus status;

    @Indexed(expireAfterSeconds = 300) // TTL: 5 minutes
    private LocalDateTime lastSeenAt;

    private String deviceInfo;

    public enum PresenceStatus {
        ONLINE, OFFLINE
    }

    public UserPresence() {
        this.status = PresenceStatus.OFFLINE;
        this.lastSeenAt = LocalDateTime.now();
    }

    public UserPresence(String id, String userId, PresenceStatus status, LocalDateTime lastSeenAt, String deviceInfo) {
        this.id = id;
        this.userId = userId;
        this.status = status;
        this.lastSeenAt = lastSeenAt;
        this.deviceInfo = deviceInfo;
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

    public PresenceStatus getStatus() {
        return status;
    }

    public void setStatus(PresenceStatus status) {
        this.status = status;
    }

    public LocalDateTime getLastSeenAt() {
        return lastSeenAt;
    }

    public void setLastSeenAt(LocalDateTime lastSeenAt) {
        this.lastSeenAt = lastSeenAt;
    }

    public String getDeviceInfo() {
        return deviceInfo;
    }

    public void setDeviceInfo(String deviceInfo) {
        this.deviceInfo = deviceInfo;
    }

    public static UserPresenceBuilder builder() {
        return new UserPresenceBuilder();
    }

    public static class UserPresenceBuilder {
        private String id;
        private String userId;
        private PresenceStatus status = PresenceStatus.OFFLINE;
        private LocalDateTime lastSeenAt = LocalDateTime.now();
        private String deviceInfo;

        UserPresenceBuilder() {
        }

        public UserPresenceBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UserPresenceBuilder userId(String userId) {
            this.userId = userId;
            return this;
        }

        public UserPresenceBuilder status(PresenceStatus status) {
            this.status = status;
            return this;
        }

        public UserPresenceBuilder lastSeenAt(LocalDateTime lastSeenAt) {
            this.lastSeenAt = lastSeenAt;
            return this;
        }

        public UserPresenceBuilder deviceInfo(String deviceInfo) {
            this.deviceInfo = deviceInfo;
            return this;
        }

        public UserPresence build() {
            return new UserPresence(id, userId, status, lastSeenAt, deviceInfo);
        }
    }
}
