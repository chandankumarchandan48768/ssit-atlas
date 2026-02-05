package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "placements")
public class PlacementRecord {
    @Id
    private String id;
    private String studentName;
    private String studentUsn;
    private String studentPhotoUrl;
    private String department;
    private String companyName;
    private String companyLogoUrl;
    private String jobRole;
    private Double packageAmount; // LPA
    private PackageType packageType;
    private LocalDateTime placementDate;
    private String location;
    private String testimonial;
    private String interviewExperience;
    private String createdByUserId;
    private String academicYear; // e.g., "2024-25"
    private boolean isApproved = true;
    private LocalDateTime createdAt;

    public enum PackageType {
        CTC, IN_HAND, STIPEND
    }

    public PlacementRecord() {
    }

    public PlacementRecord(String id, String studentName, String studentUsn, String studentPhotoUrl, String department,
            String companyName, String companyLogoUrl, String jobRole, Double packageAmount, PackageType packageType,
            LocalDateTime placementDate, String location, String testimonial, String interviewExperience,
            String createdByUserId, String academicYear, boolean isApproved, LocalDateTime createdAt) {
        this.id = id;
        this.studentName = studentName;
        this.studentUsn = studentUsn;
        this.studentPhotoUrl = studentPhotoUrl;
        this.department = department;
        this.companyName = companyName;
        this.companyLogoUrl = companyLogoUrl;
        this.jobRole = jobRole;
        this.packageAmount = packageAmount;
        this.packageType = packageType;
        this.placementDate = placementDate;
        this.location = location;
        this.testimonial = testimonial;
        this.interviewExperience = interviewExperience;
        this.createdByUserId = createdByUserId;
        this.academicYear = academicYear;
        this.isApproved = isApproved;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentUsn() {
        return studentUsn;
    }

    public void setStudentUsn(String studentUsn) {
        this.studentUsn = studentUsn;
    }

    public String getStudentPhotoUrl() {
        return studentPhotoUrl;
    }

    public void setStudentPhotoUrl(String studentPhotoUrl) {
        this.studentPhotoUrl = studentPhotoUrl;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyLogoUrl() {
        return companyLogoUrl;
    }

    public void setCompanyLogoUrl(String companyLogoUrl) {
        this.companyLogoUrl = companyLogoUrl;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public Double getPackageAmount() {
        return packageAmount;
    }

    public void setPackageAmount(Double packageAmount) {
        this.packageAmount = packageAmount;
    }

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    public LocalDateTime getPlacementDate() {
        return placementDate;
    }

    public void setPlacementDate(LocalDateTime placementDate) {
        this.placementDate = placementDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTestimonial() {
        return testimonial;
    }

    public void setTestimonial(String testimonial) {
        this.testimonial = testimonial;
    }

    public String getInterviewExperience() {
        return interviewExperience;
    }

    public void setInterviewExperience(String interviewExperience) {
        this.interviewExperience = interviewExperience;
    }

    public String getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(String createdByUserId) {
        this.createdByUserId = createdByUserId;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static PlacementRecordBuilder builder() {
        return new PlacementRecordBuilder();
    }

    public static class PlacementRecordBuilder {
        private String id;
        private String studentName;
        private String studentUsn;
        private String studentPhotoUrl;
        private String department;
        private String companyName;
        private String companyLogoUrl;
        private String jobRole;
        private Double packageAmount;
        private PackageType packageType;
        private LocalDateTime placementDate;
        private String location;
        private String testimonial;
        private String interviewExperience;
        private String createdByUserId;
        private String academicYear;
        private boolean isApproved = true;
        private LocalDateTime createdAt;

        PlacementRecordBuilder() {
        }

        public PlacementRecordBuilder id(String id) {
            this.id = id;
            return this;
        }

        public PlacementRecordBuilder studentName(String studentName) {
            this.studentName = studentName;
            return this;
        }

        public PlacementRecordBuilder studentUsn(String studentUsn) {
            this.studentUsn = studentUsn;
            return this;
        }

        public PlacementRecordBuilder studentPhotoUrl(String studentPhotoUrl) {
            this.studentPhotoUrl = studentPhotoUrl;
            return this;
        }

        public PlacementRecordBuilder department(String department) {
            this.department = department;
            return this;
        }

        public PlacementRecordBuilder companyName(String companyName) {
            this.companyName = companyName;
            return this;
        }

        public PlacementRecordBuilder companyLogoUrl(String companyLogoUrl) {
            this.companyLogoUrl = companyLogoUrl;
            return this;
        }

        public PlacementRecordBuilder jobRole(String jobRole) {
            this.jobRole = jobRole;
            return this;
        }

        public PlacementRecordBuilder packageAmount(Double packageAmount) {
            this.packageAmount = packageAmount;
            return this;
        }

        public PlacementRecordBuilder packageType(PackageType packageType) {
            this.packageType = packageType;
            return this;
        }

        public PlacementRecordBuilder placementDate(LocalDateTime placementDate) {
            this.placementDate = placementDate;
            return this;
        }

        public PlacementRecordBuilder location(String location) {
            this.location = location;
            return this;
        }

        public PlacementRecordBuilder testimonial(String testimonial) {
            this.testimonial = testimonial;
            return this;
        }

        public PlacementRecordBuilder interviewExperience(String interviewExperience) {
            this.interviewExperience = interviewExperience;
            return this;
        }

        public PlacementRecordBuilder createdByUserId(String createdByUserId) {
            this.createdByUserId = createdByUserId;
            return this;
        }

        public PlacementRecordBuilder academicYear(String academicYear) {
            this.academicYear = academicYear;
            return this;
        }

        public PlacementRecordBuilder isApproved(boolean isApproved) {
            this.isApproved = isApproved;
            return this;
        }

        public PlacementRecordBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public PlacementRecord build() {
            return new PlacementRecord(id, studentName, studentUsn, studentPhotoUrl, department, companyName,
                    companyLogoUrl, jobRole, packageAmount, packageType, placementDate, location, testimonial,
                    interviewExperience, createdByUserId, academicYear, isApproved, createdAt);
        }
    }
}
