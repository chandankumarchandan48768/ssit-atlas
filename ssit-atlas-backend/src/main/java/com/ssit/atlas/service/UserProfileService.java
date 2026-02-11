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
                .orElse(createDefaultProfile(userId));

        return convertToDto(user, profile);
    }

    public UserProfileDto updateProfile(String userId, UserProfileDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElse(createDefaultProfile(userId));

        // Update profile fields
        profile.setBio(dto.getBio());
        profile.setStatus(dto.getStatus());
        profile.setDateOfBirth(dto.getDateOfBirth());
        profile.setGender(dto.getGender());
        profile.setUpdatedAt(LocalDateTime.now());

        userProfileRepository.save(profile);

        // Update user fields
        user.setStatus(dto.getStatus());
        userRepository.save(user);

        return convertToDto(user, profile);
    }

    public String uploadProfilePhoto(String userId, MultipartFile file) throws IOException {
        // Validate file
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds 5MB limit");
        }

        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new IllegalArgumentException("Invalid file type. Allowed: jpg, jpeg, png, gif");
        }

        // Create upload directory if not exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String filename = userId + "_" + UUID.randomUUID() + "." + extension;
        Path filePath = uploadPath.resolve(filename);

        // Save file
        file.transferTo(filePath.toFile());

        // Update profile
        String photoUrl = "/uploads/profile-photos/" + filename;
        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElse(createDefaultProfile(userId));
        profile.setProfilePhotoUrl(photoUrl);
        profile.setUpdatedAt(LocalDateTime.now());
        userProfileRepository.save(profile);

        // Update user
        User user = userRepository.findById(userId).orElseThrow();
        user.setProfilePhotoUrl(photoUrl);
        userRepository.save(user);

        return photoUrl;
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
        dto.setProfilePhotoUrl(profile.getProfilePhotoUrl());
        dto.setBio(profile.getBio());
        dto.setStatus(profile.getStatus());
        dto.setDateOfBirth(profile.getDateOfBirth());
        dto.setGender(profile.getGender());
        return dto;
    }
}
