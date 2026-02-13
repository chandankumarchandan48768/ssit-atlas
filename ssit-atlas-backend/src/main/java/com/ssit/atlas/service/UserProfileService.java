package com.ssit.atlas.service;

import com.ssit.atlas.dto.UserProfileDto;
import com.ssit.atlas.model.User;
import com.ssit.atlas.model.UserProfile;
import com.ssit.atlas.repository.UserProfileRepository;
import com.ssit.atlas.repository.UserRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class UserProfileService {

    @Value("${file.upload.dir:./uploads/profile-photos/}")
    private String uploadDir;

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "gif");
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    public UserProfileService(UserProfileRepository userProfileRepository,
            UserRepository userRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
    }

    public UserProfileDto getProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultProfile(userId));

        return convertToDto(user, profile);
    }

    public UserProfileDto updateProfile(String userId, UserProfileDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultProfile(userId));

        // Update common fields
        profile.setBio(dto.getBio());
        profile.setStatus(dto.getStatus());
        profile.setDateOfBirth(dto.getDateOfBirth());
        profile.setGender(dto.getGender());

        // Update role-specific fields
        profile.setEnrollmentId(dto.getEnrollmentId());
        profile.setEmployeeId(dto.getEmployeeId());
        profile.setSemester(dto.getSemester());
        profile.setYearOfAdmission(dto.getYearOfAdmission());
        profile.setRollNumber(dto.getRollNumber());
        profile.setDesignation(dto.getDesignation());
        profile.setSpecialization(dto.getSpecialization());
        profile.setOfficeLocation(dto.getOfficeLocation());
        profile.setCabinNumber(dto.getCabinNumber());
        profile.setCommitteeRole(dto.getCommitteeRole());
        profile.setEventResponsibilities(dto.getEventResponsibilities());
        profile.setAccessLevel(dto.getAccessLevel());

        // Check profile completion based on role
        boolean isComplete = checkProfileCompletion(user.getRole(), profile);
        profile.setIsComplete(isComplete);

        profile.setUpdatedAt(LocalDateTime.now());
        userProfileRepository.save(profile);

        // Update user fields
        user.setStatus(dto.getStatus());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setDepartment(dto.getDepartment());
        userRepository.save(user);

        return convertToDto(user, profile);
    }

    public String uploadProfilePhoto(String userId, MultipartFile file) throws IOException {
        System.out.println("Starting photo upload for user: " + userId);
        System.out.println("Upload directory: " + uploadDir);
        
        // Validate file
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds 5MB limit");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new IllegalArgumentException("Invalid filename");
        }
        
        String extension = FilenameUtils.getExtension(originalFilename);
        System.out.println("File extension: " + extension);
        
        if (extension == null || extension.isEmpty()) {
            throw new IllegalArgumentException("File has no extension");
        }
        
        if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new IllegalArgumentException("Invalid file type: " + extension + ". Allowed: jpg, jpeg, png, gif");
        }

        try {
            // Get or create profile (handle duplicates)
            UserProfile profile = getOrCreateUniqueProfile(userId);
            
            // Create upload directory if not exists
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
            System.out.println("Absolute upload path: " + uploadPath);
            
            if (!Files.exists(uploadPath)) {
                System.out.println("Creating upload directory...");
                Files.createDirectories(uploadPath);
                System.out.println("Upload directory created");
            } else {
                System.out.println("Upload directory already exists");
            }

            // Generate unique filename
            String filename = userId + "_" + UUID.randomUUID() + "." + extension;
            Path filePath = uploadPath.resolve(filename);
            System.out.println("Saving file to: " + filePath);

            // Save file
            file.transferTo(filePath.toFile());
            System.out.println("File saved successfully");

            // Update profile with photo URL
            String photoUrl = "/uploads/profile-photos/" + filename;
            profile.setProfilePhotoUrl(photoUrl);
            profile.setUpdatedAt(LocalDateTime.now());
            userProfileRepository.save(profile);
            System.out.println("Profile updated with photo URL: " + photoUrl);

            // Update user
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            user.setProfilePhotoUrl(photoUrl);
            userRepository.save(user);
            System.out.println("User updated with photo URL");

            return photoUrl;
        } catch (IOException e) {
            System.err.println("IOException during file upload: " + e.getMessage());
            e.printStackTrace();
            throw new IOException("Failed to upload file: " + e.getMessage(), e);
        }
    }
    
    /**
     * Get or create a unique user profile, cleaning up any duplicates
     */
    private UserProfile getOrCreateUniqueProfile(String userId) {
        try {
            // First, get the list to check for duplicates
            var allProfiles = userProfileRepository.findAll();
            var userProfiles = allProfiles.stream()
                    .filter(p -> userId.equals(p.getUserId()))
                    .toList();
            
            if (userProfiles.isEmpty()) {
                // Create new profile
                return createDefaultProfile(userId);
            } else if (userProfiles.size() == 1) {
                // Perfect - one profile
                return userProfiles.get(0);
            } else {
                // Multiple profiles found - keep the first, delete others
                System.out.println("Found " + userProfiles.size() + " profiles for user " + userId + ", cleaning up duplicates");
                UserProfile mainProfile = userProfiles.get(0);
                
                // Delete duplicates
                for (int i = 1; i < userProfiles.size(); i++) {
                    userProfileRepository.deleteById(userProfiles.get(i).getId());
                    System.out.println("Deleted duplicate profile: " + userProfiles.get(i).getId());
                }
                
                return mainProfile;
            }
        } catch (Exception e) {
            System.err.println("Error getting or creating profile: " + e.getMessage());
            // Fallback to creating default
            return createDefaultProfile(userId);
        }
    }

    public void deleteProfilePhoto(String userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId).orElse(null);
        if (profile != null && profile.getProfilePhotoUrl() != null) {
            // Delete file
            String filename = profile.getProfilePhotoUrl().replace("/uploads/profile-photos/", "");
            Path filePath = Paths.get(uploadDir, filename);
            try {
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                // Log error but don't fail
            }

            // Update profile
            profile.setProfilePhotoUrl(null);
            profile.setUpdatedAt(LocalDateTime.now());
            userProfileRepository.save(profile);

            // Update user
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                user.setProfilePhotoUrl(null);
                userRepository.save(user);
            }
        }
    }

    private UserProfile createDefaultProfile(String userId) {
        UserProfile profile = UserProfile.builder()
                .userId(userId)
                .bio("")
                .status("Available")
                .updatedAt(LocalDateTime.now())
                .build();
        return userProfileRepository.save(profile);
    }

    private UserProfileDto convertToDto(User user, UserProfile profile) {
        UserProfileDto dto = new UserProfileDto();
        dto.setUserId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setDepartment(user.getDepartment());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setRole(user.getRole() != null ? user.getRole().name() : null);

        // Common fields
        dto.setProfilePhotoUrl(profile.getProfilePhotoUrl());
        dto.setBio(profile.getBio());
        dto.setStatus(profile.getStatus());
        dto.setDateOfBirth(profile.getDateOfBirth());
        dto.setGender(profile.getGender());

        // Role-specific fields
        dto.setEnrollmentId(profile.getEnrollmentId());
        dto.setEmployeeId(profile.getEmployeeId());
        dto.setSemester(profile.getSemester());
        dto.setYearOfAdmission(profile.getYearOfAdmission());
        dto.setRollNumber(profile.getRollNumber());
        dto.setDesignation(profile.getDesignation());
        dto.setSpecialization(profile.getSpecialization());
        dto.setOfficeLocation(profile.getOfficeLocation());
        dto.setCabinNumber(profile.getCabinNumber());
        dto.setCommitteeRole(profile.getCommitteeRole());
        dto.setEventResponsibilities(profile.getEventResponsibilities());
        dto.setAccessLevel(profile.getAccessLevel());
        dto.setIsComplete(profile.getIsComplete());

        return dto;
    }

    /**
     * Check if profile is complete based on user role
     */
    private boolean checkProfileCompletion(User.Role role, UserProfile profile) {
        if (role == null)
            return false;

        // Check basic fields
        if (profile.getProfilePhotoUrl() == null || profile.getBio() == null) {
            return false;
        }

        switch (role) {
            case STUDENT:
                return profile.getEnrollmentId() != null &&
                        profile.getSemester() != null;

            case FACULTY:
                return profile.getEmployeeId() != null &&
                        profile.getDesignation() != null &&
                        profile.getSpecialization() != null;

            case HOD:
                return profile.getEmployeeId() != null &&
                        profile.getOfficeLocation() != null;

            case MANAGEMENT_TEAM:
                return profile.getEmployeeId() != null &&
                        profile.getDesignation() != null;

            case CULTURAL_COMMITTEE:
                return (profile.getEnrollmentId() != null || profile.getEmployeeId() != null) &&
                        profile.getCommitteeRole() != null;

            case PLACEMENT_DEPARTMENT:
                return profile.getEmployeeId() != null &&
                        profile.getDesignation() != null;

            case ADMIN:
                return profile.getEmployeeId() != null &&
                        profile.getAccessLevel() != null;

            default:
                return false;
        }
    }
}
