package com.ssit.atlas.repository;

import com.ssit.atlas.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByBuildingId(String buildingId);

    List<Event> findByStartTimeAfter(java.time.LocalDateTime startTime);
}
