package com.ssit.atlas.service;

import com.ssit.atlas.model.Achievement;
import com.ssit.atlas.repository.AchievementRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AchievementService {
    private final AchievementRepository achievementRepository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    public List<Achievement> getAchievementsByDepartment(String department) {
        return achievementRepository.findByDepartment(department);
    }

    public List<Achievement> getAchievementsByBuilding(String buildingId) {
        return achievementRepository.findByBuildingId(buildingId);
    }

    public Achievement createAchievement(Achievement achievement) {
        achievement.setCreatedAt(LocalDateTime.now());
        return achievementRepository.save(achievement);
    }
}
