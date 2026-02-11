package com.ssit.atlas.dto;

import com.ssit.atlas.model.User;

public class UserDto {
    private String id;
    private String name;
    private String email;
    private String department;
    private String profilePhotoUrl;
    private User.Role role;

    public UserDto() {
    }

    public UserDto(String id, String name, String email, String department, String profilePhotoUrl, User.Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
        this.profilePhotoUrl = profilePhotoUrl;
        this.role = role;
    }

    // Static factory method to create UserDto from User entity
    public static UserDto fromUser(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getDepartment(),
                user.getProfilePhotoUrl(),
                user.getRole());
    }

    // Getters and Setters
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }

    public User.Role getRole() {
        return role;
    }

    public void setRole(User.Role role) {
        this.role = role;
    }
}
