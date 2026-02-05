package com.ssit.atlas.dto;

import com.ssit.atlas.model.User;
import java.time.LocalDateTime;

public class UserResponse {
    private String id;
    private String name;
    private String email;
    private User.Role role;
    private String department;
    private String phoneNumber;
    private boolean isActive;
    private LocalDateTime createdAt;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.department = user.getDepartment();
        this.phoneNumber = user.getPhoneNumber();
        this.isActive = user.isActive();
        this.createdAt = user.getCreatedAt();
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public User.Role getRole() {
        return role;
    }

    public String getDepartment() {
        return department;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public boolean isActive() {
        return isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
