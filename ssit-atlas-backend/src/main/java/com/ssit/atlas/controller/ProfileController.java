package com.ssit.atlas.controller;

import com.ssit.atlas.dto.UserProfileDto;
import com.ssit.atlas.service.UserProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserProfileService userProfileService;

    public ProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping
    public ResponseEntity<UserProfileDto> getOwnProfile(Authentication auth) {
        String userId = auth.getName();
        UserProfileDto profile = userProfileService.getProfile(userId);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileDto> getProfile(@PathVariable String userId) {
        UserProfileDto profile = userProfileService.getProfile(userId);
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<UserProfileDto> updateProfile(
            @RequestBody UserProfileDto dto,
            Authentication auth) {
        String userId = auth.getName();
        UserProfileDto updated = userProfileService.updateProfile(userId, dto);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/photo")
    public ResponseEntity<Map<String, String>> uploadProfilePhoto(
            @RequestParam("file") MultipartFile file,
            Authentication auth) {
        try {
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "No file provided"));
            }
            
            String userId = auth.getName();
            System.out.println("Uploading photo for user: " + userId);
            System.out.println("File name: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize());
            
            String photoUrl = userProfileService.uploadProfilePhoto(userId, file);
            System.out.println("Photo uploaded successfully: " + photoUrl);
            return ResponseEntity.ok(Map.of("url", photoUrl));
        } catch (IllegalArgumentException e) {
            System.err.println("Validation error: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IOException e) {
            System.err.println("IO error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "File upload failed: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Unexpected error: " + e.getMessage()));
        }
    }

    @DeleteMapping("/photo")
    public ResponseEntity<Void> deleteProfilePhoto(Authentication auth) {
        String userId = auth.getName();
        userProfileService.deleteProfilePhoto(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/completion-status")
    public ResponseEntity<Map<String, Object>> getCompletionStatus(Authentication auth) {
        String userId = auth.getName();
        UserProfileDto profile = userProfileService.getProfile(userId);

        Map<String, Object> status = Map.of(
                "isComplete", profile.getIsComplete() != null ? profile.getIsComplete() : false,
                "role", profile.getRole() != null ? profile.getRole() : "UNKNOWN");

        return ResponseEntity.ok(status);
    }
}
