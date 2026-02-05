package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "notices")
public class Notice {
    @Id
    private String id;
    private String title;
    private String content;
    private NoticeType noticeType;
    private Priority priority;
    private String department;
    private String createdByUserId;
    private List<String> attachmentUrls;
    private TargetAudience targetAudience;
    private LocalDateTime expiryDate;
    private List<String> viewedByUserIds;
    private boolean isPinned;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum NoticeType {
        MEMO, CIRCULAR, NOTICE, ANNOUNCEMENT
    }

    public enum Priority {
        EMERGENCY, IMPORTANT, NORMAL, FYI
    }

    public enum TargetAudience {
        ALL, FACULTY, STUDENTS
    }

    public Notice() {
    }

    public Notice(String id, String title, String content, NoticeType noticeType, Priority priority, String department,
            String createdByUserId, List<String> attachmentUrls, TargetAudience targetAudience,
            LocalDateTime expiryDate, List<String> viewedByUserIds, boolean isPinned, LocalDateTime createdAt,
            LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.noticeType = noticeType;
        this.priority = priority;
        this.department = department;
        this.createdByUserId = createdByUserId;
        this.attachmentUrls = attachmentUrls;
        this.targetAudience = targetAudience;
        this.expiryDate = expiryDate;
        this.viewedByUserIds = viewedByUserIds;
        this.isPinned = isPinned;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public NoticeType getNoticeType() {
        return noticeType;
    }

    public void setNoticeType(NoticeType noticeType) {
        this.noticeType = noticeType;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(String createdByUserId) {
        this.createdByUserId = createdByUserId;
    }

    public List<String> getAttachmentUrls() {
        return attachmentUrls;
    }

    public void setAttachmentUrls(List<String> attachmentUrls) {
        this.attachmentUrls = attachmentUrls;
    }

    public TargetAudience getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(TargetAudience targetAudience) {
        this.targetAudience = targetAudience;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    public List<String> getViewedByUserIds() {
        return viewedByUserIds;
    }

    public void setViewedByUserIds(List<String> viewedByUserIds) {
        this.viewedByUserIds = viewedByUserIds;
    }

    public boolean isPinned() {
        return isPinned;
    }

    public void setPinned(boolean pinned) {
        isPinned = pinned;
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

    public static NoticeBuilder builder() {
        return new NoticeBuilder();
    }

    public static class NoticeBuilder {
        private String id;
        private String title;
        private String content;
        private NoticeType noticeType;
        private Priority priority;
        private String department;
        private String createdByUserId;
        private List<String> attachmentUrls;
        private TargetAudience targetAudience;
        private LocalDateTime expiryDate;
        private List<String> viewedByUserIds;
        private boolean isPinned;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        NoticeBuilder() {
        }

        public NoticeBuilder id(String id) {
            this.id = id;
            return this;
        }

        public NoticeBuilder title(String title) {
            this.title = title;
            return this;
        }

        public NoticeBuilder content(String content) {
            this.content = content;
            return this;
        }

        public NoticeBuilder noticeType(NoticeType noticeType) {
            this.noticeType = noticeType;
            return this;
        }

        public NoticeBuilder priority(Priority priority) {
            this.priority = priority;
            return this;
        }

        public NoticeBuilder department(String department) {
            this.department = department;
            return this;
        }

        public NoticeBuilder createdByUserId(String createdByUserId) {
            this.createdByUserId = createdByUserId;
            return this;
        }

        public NoticeBuilder attachmentUrls(List<String> attachmentUrls) {
            this.attachmentUrls = attachmentUrls;
            return this;
        }

        public NoticeBuilder targetAudience(TargetAudience targetAudience) {
            this.targetAudience = targetAudience;
            return this;
        }

        public NoticeBuilder expiryDate(LocalDateTime expiryDate) {
            this.expiryDate = expiryDate;
            return this;
        }

        public NoticeBuilder viewedByUserIds(List<String> viewedByUserIds) {
            this.viewedByUserIds = viewedByUserIds;
            return this;
        }

        public NoticeBuilder isPinned(boolean isPinned) {
            this.isPinned = isPinned;
            return this;
        }

        public NoticeBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public NoticeBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Notice build() {
            return new Notice(id, title, content, noticeType, priority, department, createdByUserId, attachmentUrls,
                    targetAudience, expiryDate, viewedByUserIds, isPinned, createdAt, updatedAt);
        }
    }
}
