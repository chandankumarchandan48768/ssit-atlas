package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "events")
public class Event {
    @Id
    private String id;
    private String title;
    private String description;
    private String buildingId;
    private String roomId;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String organizer;
    private List<String> tags;
    private String createdByUserId;

    public Event() {
    }

    public Event(String id, String title, String description, String buildingId, String roomId, LocalDateTime startTime,
            LocalDateTime endTime, String organizer, List<String> tags, String createdByUserId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.buildingId = buildingId;
        this.roomId = roomId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.organizer = organizer;
        this.tags = tags;
        this.createdByUserId = createdByUserId;
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

    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(String createdByUserId) {
        this.createdByUserId = createdByUserId;
    }

    public static EventBuilder builder() {
        return new EventBuilder();
    }

    public static class EventBuilder {
        private String id;
        private String title;
        private String description;
        private String buildingId;
        private String roomId;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String organizer;
        private List<String> tags;
        private String createdByUserId;

        EventBuilder() {
        }

        public EventBuilder id(String id) {
            this.id = id;
            return this;
        }

        public EventBuilder title(String title) {
            this.title = title;
            return this;
        }

        public EventBuilder description(String description) {
            this.description = description;
            return this;
        }

        public EventBuilder buildingId(String buildingId) {
            this.buildingId = buildingId;
            return this;
        }

        public EventBuilder roomId(String roomId) {
            this.roomId = roomId;
            return this;
        }

        public EventBuilder startTime(LocalDateTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public EventBuilder endTime(LocalDateTime endTime) {
            this.endTime = endTime;
            return this;
        }

        public EventBuilder organizer(String organizer) {
            this.organizer = organizer;
            return this;
        }

        public EventBuilder tags(List<String> tags) {
            this.tags = tags;
            return this;
        }

        public EventBuilder createdByUserId(String createdByUserId) {
            this.createdByUserId = createdByUserId;
            return this;
        }

        public Event build() {
            return new Event(id, title, description, buildingId, roomId, startTime, endTime, organizer, tags,
                    createdByUserId);
        }
    }
}
