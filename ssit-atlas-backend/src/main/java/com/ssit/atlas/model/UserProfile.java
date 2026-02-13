package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "user_profiles")
public class UserProfile {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String userId;
    private String profilePhotoUrl;
    private String bio;
    private String status;
    private LocalDate dateOfBirth;
    private String gender;

    // Role-specific fields
    private String enrollmentId; // STUDENT
    private String employeeId; // FACULTY, HOD, ADMIN, etc.
    private Integer semester; // STUDENT (1-8)
    private Integer yearOfAdmission; // STUDENT
    private String rollNumber; // STUDENT
    private String designation; // FACULTY, PLACEMENT, MANAGEMENT, etc.
    private String specialization; // FACULTY
    private String officeLocation; // FACULTY, HOD, MANAGEMENT
    private String cabinNumber; // FACULTY, HOD
    private String committeeRole; // CULTURAL_COMMITTEE
    private List<String> eventResponsibilities; // CULTURAL_COMMITTEE
    private String accessLevel; // ADMIN

    // Profile completion tracking
    private Boolean isComplete = false;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public UserProfile() {
    }

    public UserProfile(String id, String userId, String profilePhotoUrl, String bio, String status,
            LocalDate dateOfBirth, String gender, String enrollmentId, String employeeId,
            Integer semester, Integer yearOfAdmission, String rollNumber, String designation,
            String specialization, String officeLocation, String cabinNumber, String committeeRole,
            List<String> eventResponsibilities, String accessLevel, Boolean isComplete,
            LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.profilePhotoUrl = profilePhotoUrl;
        this.bio = bio;
        this.status = status;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.enrollmentId = enrollmentId;
        this.employeeId = employeeId;
        this.semester = semester;
        this.yearOfAdmission = yearOfAdmission;
        this.rollNumber = rollNumber;
        this.designation = designation;
        this.specialization = specialization;
        this.officeLocation = officeLocation;
        this.cabinNumber = cabinNumber;
        this.committeeRole = committeeRole;
        this.eventResponsibilities = eventResponsibilities;
        this.accessLevel = accessLevel;
        this.isComplete = isComplete;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
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

    public String getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(String enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Integer getYearOfAdmission() {
        return yearOfAdmission;
    }

    public void setYearOfAdmission(Integer yearOfAdmission) {
        this.yearOfAdmission = yearOfAdmission;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getOfficeLocation() {
        return officeLocation;
    }

    public void setOfficeLocation(String officeLocation) {
        this.officeLocation = officeLocation;
    }

    public String getCabinNumber() {
        return cabinNumber;
    }

    public void setCabinNumber(String cabinNumber) {
        this.cabinNumber = cabinNumber;
    }

    public String getCommitteeRole() {
        return committeeRole;
    }

    public void setCommitteeRole(String committeeRole) {
        this.committeeRole = committeeRole;
    }

    public List<String> getEventResponsibilities() {
        return eventResponsibilities;
    }

    public void setEventResponsibilities(List<String> eventResponsibilities) {
        this.eventResponsibilities = eventResponsibilities;
    }

    public String getAccessLevel() {
        return accessLevel;
    }

    public void setAccessLevel(String accessLevel) {
        this.accessLevel = accessLevel;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
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
        private String enrollmentId;
        private String employeeId;
        private Integer semester;
        private Integer yearOfAdmission;
        private String rollNumber;
        private String designation;
        private String specialization;
        private String officeLocation;
        private String cabinNumber;
        private String committeeRole;
        private List<String> eventResponsibilities;
        private String accessLevel;
        private Boolean isComplete = false;
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

        public UserProfileBuilder enrollmentId(String enrollmentId) {
            this.enrollmentId = enrollmentId;
            return this;
        }

        public UserProfileBuilder employeeId(String employeeId) {
            this.employeeId = employeeId;
            return this;
        }

        public UserProfileBuilder semester(Integer semester) {
            this.semester = semester;
            return this;
        }

        public UserProfileBuilder yearOfAdmission(Integer yearOfAdmission) {
            this.yearOfAdmission = yearOfAdmission;
            return this;
        }

        public UserProfileBuilder rollNumber(String rollNumber) {
            this.rollNumber = rollNumber;
            return this;
        }

        public UserProfileBuilder designation(String designation) {
            this.designation = designation;
            return this;
        }

        public UserProfileBuilder specialization(String specialization) {
            this.specialization = specialization;
            return this;
        }

        public UserProfileBuilder officeLocation(String officeLocation) {
            this.officeLocation = officeLocation;
            return this;
        }

        public UserProfileBuilder cabinNumber(String cabinNumber) {
            this.cabinNumber = cabinNumber;
            return this;
        }

        public UserProfileBuilder committeeRole(String committeeRole) {
            this.committeeRole = committeeRole;
            return this;
        }

        public UserProfileBuilder eventResponsibilities(List<String> eventResponsibilities) {
            this.eventResponsibilities = eventResponsibilities;
            return this;
        }

        public UserProfileBuilder accessLevel(String accessLevel) {
            this.accessLevel = accessLevel;
            return this;
        }

        public UserProfileBuilder isComplete(Boolean isComplete) {
            this.isComplete = isComplete;
            return this;
        }

        public UserProfileBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public UserProfile build() {
            return new UserProfile(id, userId, profilePhotoUrl, bio, status, dateOfBirth, gender,
                    enrollmentId, employeeId, semester, yearOfAdmission, rollNumber, designation,
                    specialization, officeLocation, cabinNumber, committeeRole, eventResponsibilities,
                    accessLevel, isComplete, updatedAt);
        }
    }
}
