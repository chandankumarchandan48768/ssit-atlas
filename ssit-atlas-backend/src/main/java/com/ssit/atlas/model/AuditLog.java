package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "audit_logs")
public class AuditLog {
    @Id
    private String id;
    private String action;
    private String performedBy; // Email or User ID
    private LocalDateTime timestamp;
    private String details;

    public AuditLog() {
    }

    public AuditLog(String action, String performedBy, String details) {
        this.action = action;
        this.performedBy = performedBy;
        this.timestamp = LocalDateTime.now();
        this.details = details;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
