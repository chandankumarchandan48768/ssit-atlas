package com.ssit.atlas.repository;

import com.ssit.atlas.model.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AchievementRepository extends MongoRepository<Achievement, String> {
    List<Achievement> findByDepartment(String department);
    List<Achievement> findByBuildingId(String buildingId);
}
