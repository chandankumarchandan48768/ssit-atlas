package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "rooms")
public class Room {
    @Id
    private String id;
    private String buildingId;
    private String name;
    private String roomNumber;
    private Integer floor;
    private RoomType type;

    private List<Double> coordinates; // [lat, lng]
    private List<String> tags;

    public enum RoomType {
        CLASSROOM, LAB, OFFICE, HALL, OTHER
    }

    public Room() {
    }

    public Room(String id, String buildingId, String name, String roomNumber, Integer floor, RoomType type,
            List<Double> coordinates, List<String> tags) {
        this.id = id;
        this.buildingId = buildingId;
        this.name = name;
        this.roomNumber = roomNumber;
        this.floor = floor;
        this.type = type;
        this.coordinates = coordinates;
        this.tags = tags;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public RoomType getType() {
        return type;
    }

    public void setType(RoomType type) {
        this.type = type;
    }

    public List<Double> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public static RoomBuilder builder() {
        return new RoomBuilder();
    }

    public static class RoomBuilder {
        private String id;
        private String buildingId;
        private String name;
        private String roomNumber;
        private Integer floor;
        private RoomType type;
        private List<Double> coordinates;
        private List<String> tags;

        RoomBuilder() {
        }

        public RoomBuilder id(String id) {
            this.id = id;
            return this;
        }

        public RoomBuilder buildingId(String buildingId) {
            this.buildingId = buildingId;
            return this;
        }

        public RoomBuilder name(String name) {
            this.name = name;
            return this;
        }

        public RoomBuilder roomNumber(String roomNumber) {
            this.roomNumber = roomNumber;
            return this;
        }

        public RoomBuilder floor(Integer floor) {
            this.floor = floor;
            return this;
        }

        public RoomBuilder type(RoomType type) {
            this.type = type;
            return this;
        }

        public RoomBuilder coordinates(List<Double> coordinates) {
            this.coordinates = coordinates;
            return this;
        }

        public RoomBuilder tags(List<String> tags) {
            this.tags = tags;
            return this;
        }

        public Room build() {
            return new Room(id, buildingId, name, roomNumber, floor, type, coordinates, tags);
        }
    }
}
