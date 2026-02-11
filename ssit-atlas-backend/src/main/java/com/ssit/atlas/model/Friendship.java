package com.ssit.atlas.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "friendships")
@CompoundIndex(name = "users_idx", def = "{'user1Id': 1, 'user2Id': 1}", unique = true)
public class Friendship {
    @Id
    private String id;

    @Indexed
    private String user1Id; // Always alphabetically first

    @Indexed
    private String user2Id; // Always alphabetically second

    @CreatedDate
    private LocalDateTime createdAt;

    public Friendship() {
    }

    public Friendship(String id, String user1Id, String user2Id, LocalDateTime createdAt) {
        this.id = id;
        this.user1Id = user1Id;
        this.user2Id = user2Id;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUser1Id() {
        return user1Id;
    }

    public void setUser1Id(String user1Id) {
        this.user1Id = user1Id;
    }

    public String getUser2Id() {
        return user2Id;
    }

    public void setUser2Id(String user2Id) {
        this.user2Id = user2Id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static FriendshipBuilder builder() {
        return new FriendshipBuilder();
    }

    public static class FriendshipBuilder {
        private String id;
        private String user1Id;
        private String user2Id;
        private LocalDateTime createdAt;

        FriendshipBuilder() {
        }

        public FriendshipBuilder id(String id) {
            this.id = id;
            return this;
        }

        public FriendshipBuilder user1Id(String user1Id) {
            this.user1Id = user1Id;
            return this;
        }

        public FriendshipBuilder user2Id(String user2Id) {
            this.user2Id = user2Id;
            return this;
        }

        public FriendshipBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Friendship build() {
            return new Friendship(id, user1Id, user2Id, createdAt);
        }
    }
}
