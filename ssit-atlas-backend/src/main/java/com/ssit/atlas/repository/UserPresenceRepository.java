package com.ssit.atlas.repository;

import com.ssit.atlas.model.UserPresence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserPresenceRepository extends MongoRepository<UserPresence, String> {

    Optional<UserPresence> findByUserId(String userId);

    List<UserPresence> findByUserIdIn(List<String> userIds);

    void deleteByUserId(String userId);
}
