package com.ssit.atlas.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "achievements")
public class Achievement {
    @Id
    private String id;
    private String title;
    private String personName;
    private String department;
    private String description;
    private String imageUrl;
    private String buildingId;

    @CreatedDate
    private LocalDateTime createdAt;

    public Achievement() {
    }

    public Achievement(String id, String title, String personName, String department, String description,
            String imageUrl, String buildingId, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.personName = personName;
        this.department = department;
        this.description = description;
        this.imageUrl = imageUrl;
        this.buildingId = buildingId;
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

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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

    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static AchievementBuilder builder() {
        return new AchievementBuilder();
    }

    public static class AchievementBuilder {
        private String id;
        private String title;
        private String personName;
        private String department;
        private String description;
        private String imageUrl;
        private String buildingId;
        private LocalDateTime createdAt;

        AchievementBuilder() {
        }

        public AchievementBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AchievementBuilder title(String title) {
            this.title = title;
            return this;
        }

        public AchievementBuilder personName(String personName) {
            this.personName = personName;
            return this;
        }

        public AchievementBuilder department(String department) {
            this.department = department;
            return this;
        }

        public AchievementBuilder description(String description) {
            this.description = description;
            return this;
        }

        public AchievementBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public AchievementBuilder buildingId(String buildingId) {
            this.buildingId = buildingId;
            return this;
        }

        public AchievementBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Achievement build() {
            return new Achievement(id, title, personName, department, description, imageUrl, buildingId, createdAt);
        }
    }
}
