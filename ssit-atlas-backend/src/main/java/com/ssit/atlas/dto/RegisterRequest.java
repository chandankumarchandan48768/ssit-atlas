package com.ssit.atlas.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ssit.atlas.config.RoleDeserializer;
import com.ssit.atlas.model.User;

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    @JsonDeserialize(using = RoleDeserializer.class)
    private User.Role role;
    private String department;
    private String phoneNumber;

    public RegisterRequest() {
    }

    public RegisterRequest(String name, String email, String password, User.Role role, String department,
            String phoneNumber) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.department = department;
        this.phoneNumber = phoneNumber;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public static RegisterRequestBuilder builder() {
        return new RegisterRequestBuilder();
    }

    public static class RegisterRequestBuilder {
        private String name;
        private String email;
        private String password;
        private User.Role role;
        private String department;
        private String phoneNumber;

        RegisterRequestBuilder() {
        }

        public RegisterRequestBuilder name(String name) {
            this.name = name;
            return this;
        }

        public RegisterRequestBuilder email(String email) {
            this.email = email;
            return this;
        }

        public RegisterRequestBuilder password(String password) {
            this.password = password;
            return this;
        }

        public RegisterRequestBuilder role(User.Role role) {
            this.role = role;
            return this;
        }

        public RegisterRequestBuilder department(String department) {
            this.department = department;
            return this;
        }

        public RegisterRequestBuilder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public RegisterRequest build() {
            return new RegisterRequest(name, email, password, role, department, phoneNumber);
        }
    }
}
