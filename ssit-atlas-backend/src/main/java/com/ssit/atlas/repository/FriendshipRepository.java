package com.ssit.atlas.repository;

import com.ssit.atlas.model.Friendship;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends MongoRepository<Friendship, String> {

    @Query("{'$or': [{'user1Id': ?0}, {'user2Id': ?0}]}")
    List<Friendship> findByUser1IdOrUser2Id(String userId);

    boolean existsByUser1IdAndUser2Id(String user1Id, String user2Id);

    @Query("{'$or': [{'user1Id': ?0, 'user2Id': ?1}, {'user1Id': ?1, 'user2Id': ?0}]}")
    Friendship findByUserIds(String userId1, String userId2);

    void deleteByUser1IdAndUser2Id(String user1Id, String user2Id);
}
