package com.ssit.atlas.repository;

import com.ssit.atlas.model.FriendLocation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FriendLocationRepository extends MongoRepository<FriendLocation, String> {
    Optional<FriendLocation> findByUserId(String userId);
    List<FriendLocation> findByVisibility(FriendLocation.Visibility visibility);
}
