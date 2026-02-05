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

    private String brochureUrl;
    private String posterUrl;
    private Integer capacity;
    private List<String> registeredUserIds;
    private EventType eventType;
    private boolean registrationRequired;
    private LocalDateTime registrationDeadline;
    private String contactEmail;
    private String contactPhone;

    public enum EventType {
        CULTURAL, TECHNICAL, SPORTS, WORKSHOP, SEMINAR, OTHER
    }

    public Event() {
    }

    public Event(String id, String title, String description, String buildingId, String roomId, LocalDateTime startTime,
            LocalDateTime endTime, String organizer, List<String> tags, String createdByUserId, String brochureUrl,
            String posterUrl, Integer capacity, List<String> registeredUserIds, EventType eventType,
            boolean registrationRequired, LocalDateTime registrationDeadline, String contactEmail,
            String contactPhone) {
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
        this.brochureUrl = brochureUrl;
        this.posterUrl = posterUrl;
        this.capacity = capacity;
        this.registeredUserIds = registeredUserIds;
        this.eventType = eventType;
        this.registrationRequired = registrationRequired;
        this.registrationDeadline = registrationDeadline;
        this.contactEmail = contactEmail;
        this.contactPhone = contactPhone;
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

    public String getBrochureUrl() {
        return brochureUrl;
    }

    public void setBrochureUrl(String brochureUrl) {
        this.brochureUrl = brochureUrl;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public List<String> getRegisteredUserIds() {
        return registeredUserIds;
    }

    public void setRegisteredUserIds(List<String> registeredUserIds) {
        this.registeredUserIds = registeredUserIds;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public boolean isRegistrationRequired() {
        return registrationRequired;
    }

    public void setRegistrationRequired(boolean registrationRequired) {
        this.registrationRequired = registrationRequired;
    }

    public LocalDateTime getRegistrationDeadline() {
        return registrationDeadline;
    }

    public void setRegistrationDeadline(LocalDateTime registrationDeadline) {
        this.registrationDeadline = registrationDeadline;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
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
        private String brochureUrl;
        private String posterUrl;
        private Integer capacity;
        private List<String> registeredUserIds;
        private EventType eventType;
        private boolean registrationRequired;
        private LocalDateTime registrationDeadline;
        private String contactEmail;
        private String contactPhone;

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

        public EventBuilder brochureUrl(String brochureUrl) {
            this.brochureUrl = brochureUrl;
            return this;
        }

        public EventBuilder posterUrl(String posterUrl) {
            this.posterUrl = posterUrl;
            return this;
        }

        public EventBuilder capacity(Integer capacity) {
            this.capacity = capacity;
            return this;
        }

        public EventBuilder registeredUserIds(List<String> registeredUserIds) {
            this.registeredUserIds = registeredUserIds;
            return this;
        }

        public EventBuilder eventType(EventType eventType) {
            this.eventType = eventType;
            return this;
        }

        public EventBuilder registrationRequired(boolean registrationRequired) {
            this.registrationRequired = registrationRequired;
            return this;
        }

        public EventBuilder registrationDeadline(LocalDateTime registrationDeadline) {
            this.registrationDeadline = registrationDeadline;
            return this;
        }

        public EventBuilder contactEmail(String contactEmail) {
            this.contactEmail = contactEmail;
            return this;
        }

        public EventBuilder contactPhone(String contactPhone) {
            this.contactPhone = contactPhone;
            return this;
        }

        public Event build() {
            return new Event(id, title, description, buildingId, roomId, startTime, endTime, organizer, tags,
                    createdByUserId, brochureUrl, posterUrl, capacity, registeredUserIds, eventType,
                    registrationRequired, registrationDeadline, contactEmail, contactPhone);
        }
    }
}
