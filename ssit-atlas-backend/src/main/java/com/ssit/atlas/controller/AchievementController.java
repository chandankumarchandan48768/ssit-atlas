package com.ssit.atlas.controller;

import com.ssit.atlas.model.Achievement;
import com.ssit.atlas.service.AchievementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping
    public List<Achievement> getAchievements(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String buildingId) {
        if (department != null) {
            return achievementService.getAchievementsByDepartment(department);
        }
        if (buildingId != null) {
            return achievementService.getAchievementsByBuilding(buildingId);
        }
        return achievementService.getAllAchievements();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('HOD', 'FACULTY', 'ADMIN')")
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        return ResponseEntity.ok(achievementService.createAchievement(achievement));
    }
}
