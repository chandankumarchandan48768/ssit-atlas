package com.ssit.atlas.controller;

import com.ssit.atlas.dto.UserProfileDto;
import com.ssit.atlas.service.UserProfileService;
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
            String userId = auth.getName();
            String photoUrl = userProfileService.uploadProfilePhoto(userId, file);
            return ResponseEntity.ok(Map.of("url", photoUrl));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "File upload failed: " + e.getMessage()));
        }
    }

    @DeleteMapping("/photo")
    public ResponseEntity<Void> deleteProfilePhoto(Authentication auth) {
        String userId = auth.getName();
        userProfileService.deleteProfilePhoto(userId);
        return ResponseEntity.ok().build();
    }
}
