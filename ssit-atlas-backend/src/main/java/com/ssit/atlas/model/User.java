package com.ssit.atlas.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String passwordHash;
    private Role role;

    @CreatedDate
    private LocalDateTime createdAt;

    private String department;
    private String phoneNumber;
    private boolean isActive = true;

    // Profile fields for quick access
    private String profilePhotoUrl;
    private String status; // WhatsApp-like status message
    private LocalDateTime lastSeenAt;
    private boolean isOnline = false;

    public enum Role {
        STUDENT, FACULTY, ADMIN, CULTURAL_COMMITTEE, MANAGEMENT_TEAM, PLACEMENT_DEPARTMENT, HOD
    }

    public User() {
    }

    public User(String id, String name, String email, String passwordHash, Role role, LocalDateTime createdAt,
            String department, String phoneNumber, boolean isActive, String profilePhotoUrl,
            String status, LocalDateTime lastSeenAt, boolean isOnline) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.createdAt = createdAt;
        this.department = department;
        this.phoneNumber = phoneNumber;
        this.isActive = isActive;
        this.profilePhotoUrl = profilePhotoUrl;
        this.status = status;
        this.lastSeenAt = lastSeenAt;
        this.isOnline = isOnline;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getLastSeenAt() {
        return lastSeenAt;
    }

    public void setLastSeenAt(LocalDateTime lastSeenAt) {
        this.lastSeenAt = lastSeenAt;
    }

    public boolean isOnline() {
        return isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private String id;
        private String name;
        private String email;
        private String passwordHash;
        private Role role;
        private LocalDateTime createdAt;
        private String department;
        private String phoneNumber;
        private boolean isActive = true;
        private String profilePhotoUrl;
        private String status;
        private LocalDateTime lastSeenAt;
        private boolean isOnline = false;

        UserBuilder() {
        }

        public UserBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UserBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder passwordHash(String passwordHash) {
            this.passwordHash = passwordHash;
            return this;
        }

        public UserBuilder role(Role role) {
            this.role = role;
            return this;
        }

        public UserBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public UserBuilder department(String department) {
            this.department = department;
            return this;
        }

        public UserBuilder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public UserBuilder isActive(boolean isActive) {
            this.isActive = isActive;
            return this;
        }

        public UserBuilder profilePhotoUrl(String profilePhotoUrl) {
            this.profilePhotoUrl = profilePhotoUrl;
            return this;
        }

        public UserBuilder status(String status) {
            this.status = status;
            return this;
        }

        public UserBuilder lastSeenAt(LocalDateTime lastSeenAt) {
            this.lastSeenAt = lastSeenAt;
            return this;
        }

        public UserBuilder isOnline(boolean isOnline) {
            this.isOnline = isOnline;
            return this;
        }

        public User build() {
            return new User(id, name, email, passwordHash, role, createdAt, department, phoneNumber, isActive,
                    profilePhotoUrl, status, lastSeenAt, isOnline);
        }
    }
}
