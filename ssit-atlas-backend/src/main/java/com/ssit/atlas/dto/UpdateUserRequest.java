package com.ssit.atlas.dto;

import com.ssit.atlas.model.User;

public class UpdateUserRequest {
    private String name;
    private String email;
    private User.Role role;
    private String department;
    private String phoneNumber;
    private Boolean isActive;

    public UpdateUserRequest() {
    }

    public UpdateUserRequest(String name, String email, User.Role role, String department, String phoneNumber,
            Boolean isActive) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.department = department;
        this.phoneNumber = phoneNumber;
        this.isActive = isActive;
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

    public User.Role getRole() {
        return role;
    }

    public void setRole(User.Role role) {
        this.role = role;
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

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
