package com.ssit.atlas.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import com.ssit.atlas.model.UserProfile;
import com.ssit.atlas.repository.UserProfileRepository;
import org.springframework.data.domain.Sort;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Initializes MongoDB indexes and cleans up duplicate records on application startup
 */
@Configuration
public class DatabaseInitializer {

    @Bean
    public ApplicationRunner initializeDatabase(MongoTemplate mongoTemplate, 
                                                UserProfileRepository userProfileRepository) {
        return args -> {
            try {
                System.out.println("Starting MongoDB initialization...");
                
                // Create unique index on userId field
                mongoTemplate.indexOps(UserProfile.class)
                        .ensureIndex(new Index().on("userId", Sort.Direction.ASC).unique());
                System.out.println("✓ Unique index on userId field ensured");
                
                // Clean up duplicate profiles
                cleanupDuplicateProfiles(mongoTemplate, userProfileRepository);
                
                System.out.println("✓ MongoDB initialization completed successfully");
            } catch (Exception e) {
                System.err.println("✗ Error during MongoDB initialization: " + e.getMessage());
                e.printStackTrace();
            }
        };
    }

    /**
     * Remove duplicate UserProfile entries, keeping only the first one
     */
    private void cleanupDuplicateProfiles(MongoTemplate mongoTemplate, 
                                         UserProfileRepository userProfileRepository) {
        try {
            List<UserProfile> allProfiles = mongoTemplate.findAll(UserProfile.class);
            
            // Group by userId
            Map<String, List<UserProfile>> profilesByUserId = new HashMap<>();
            for (UserProfile profile : allProfiles) {
                profilesByUserId.computeIfAbsent(profile.getUserId(), k -> new java.util.ArrayList<>())
                        .add(profile);
            }
            
            // Find and delete duplicates
            int duplicatesRemoved = 0;
            for (Map.Entry<String, List<UserProfile>> entry : profilesByUserId.entrySet()) {
                String userId = entry.getKey();
                List<UserProfile> profiles = entry.getValue();
                
                if (profiles.size() > 1) {
                    System.out.println("Found " + profiles.size() + " profiles for userId: " + userId);
                    
                    // Keep the first one (oldest), delete the rest
                    for (int i = 1; i < profiles.size(); i++) {
                        UserProfile duplicateProfile = profiles.get(i);
                        mongoTemplate.remove(Query.query(Criteria.where("_id").is(duplicateProfile.getId())), 
                                           UserProfile.class);
                        duplicatesRemoved++;
                        System.out.println("  - Removed duplicate profile: " + duplicateProfile.getId());
                    }
                }
            }
            
            if (duplicatesRemoved > 0) {
                System.out.println("✓ Removed " + duplicatesRemoved + " duplicate UserProfile records");
            } else {
                System.out.println("✓ No duplicate UserProfile records found");
            }
        } catch (Exception e) {
            System.err.println("Error cleaning up duplicate profiles: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
