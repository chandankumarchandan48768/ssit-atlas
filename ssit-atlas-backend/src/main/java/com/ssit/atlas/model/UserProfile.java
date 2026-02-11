package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "user_profiles")
public class UserProfile {
    @Id
    private String id;
    private String userId;
    private String profilePhotoUrl;
    private String bio;
    private String status;
    private LocalDate dateOfBirth;
    private String gender;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public UserProfile() {
    }

    public UserProfile(String id, String userId, String profilePhotoUrl, String bio, String status,
            LocalDate dateOfBirth, String gender, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.profilePhotoUrl = profilePhotoUrl;
        this.bio = bio;
        this.status = status;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.updatedAt = updatedAt;
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

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static UserProfileBuilder builder() {
        return new UserProfileBuilder();
    }

    public static class UserProfileBuilder {
        private String id;
        private String userId;
        private String profilePhotoUrl;
        private String bio;
        private String status;
        private LocalDate dateOfBirth;
        private String gender;
        private LocalDateTime updatedAt;

        UserProfileBuilder() {
        }

        public UserProfileBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UserProfileBuilder userId(String userId) {
            this.userId = userId;
            return this;
        }

        public UserProfileBuilder profilePhotoUrl(String profilePhotoUrl) {
            this.profilePhotoUrl = profilePhotoUrl;
            return this;
        }

        public UserProfileBuilder bio(String bio) {
            this.bio = bio;
            return this;
        }

        public UserProfileBuilder status(String status) {
            this.status = status;
            return this;
        }

        public UserProfileBuilder dateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public UserProfileBuilder gender(String gender) {
            this.gender = gender;
            return this;
        }

        public UserProfileBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public UserProfile build() {
            return new UserProfile(id, userId, profilePhotoUrl, bio, status, dateOfBirth, gender, updatedAt);
        }
    }
}
