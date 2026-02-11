package com.ssit.atlas.config;

import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@Configuration
public class RoleMigration implements CommandLineRunner {

    private final MongoTemplate mongoTemplate;

    public RoleMigration(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            System.out.println("Starting role migration...");

            // Fix lowercase roles to uppercase
            String[][] roleMappings = {
                    { "user", "STUDENT" }, // Map legacy "user" role to STUDENT
                    { "admin", "ADMIN" },
                    { "student", "STUDENT" },
                    { "faculty", "FACULTY" },
                    { "cultural_committee", "CULTURAL_COMMITTEE" },
                    { "management_team", "MANAGEMENT_TEAM" },
                    { "placement_department", "PLACEMENT_DEPARTMENT" },
                    { "hod", "HOD" }
            };

            int totalUpdated = 0;
            for (String[] mapping : roleMappings) {
                String oldRole = mapping[0];
                String newRole = mapping[1];

                Query query = new Query(Criteria.where("role").is(oldRole));
                Update update = new Update().set("role", newRole);

                UpdateResult result = mongoTemplate.updateMulti(query, update, "users");
                if (result.getModifiedCount() > 0) {
                    System.out.println("Updated " + result.getModifiedCount() + " users from role '" + oldRole
                            + "' to '" + newRole + "'");
                    totalUpdated += result.getModifiedCount();
                }
            }

            // Fix null roles
            Query nullRoleQuery = new Query(Criteria.where("role").is(null));
            Update setStudentRole = new Update().set("role", "STUDENT");
            UpdateResult nullResult = mongoTemplate.updateMulti(nullRoleQuery, setStudentRole, "users");

            if (nullResult.getModifiedCount() > 0) {
                System.out.println("Updated " + nullResult.getModifiedCount() + " users with null role to 'STUDENT'");
                totalUpdated += nullResult.getModifiedCount();
            }

            if (totalUpdated > 0) {
                System.out.println("Role migration completed successfully. Total users updated: " + totalUpdated);
            } else {
                System.out.println("No role migration needed - all users have valid roles");
            }
        } catch (Exception e) {
            System.err.println("Error during role migration: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
