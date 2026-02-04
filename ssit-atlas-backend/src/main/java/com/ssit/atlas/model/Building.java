package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "buildings")
public class Building {
    @Id
    private String id;
    private String name;
    private String code;
    private String description;

    private List<Double> center; // [lat, lng]
    private List<List<Double>> polygon; // List of [lat, lng]

    private List<Integer> floors;
    private Map<String, Object> metadata;

    public Building() {
    }

    public Building(String id, String name, String code, String description, List<Double> center,
            List<List<Double>> polygon, List<Integer> floors, Map<String, Object> metadata) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.center = center;
        this.polygon = polygon;
        this.floors = floors;
        this.metadata = metadata;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Double> getCenter() {
        return center;
    }

    public void setCenter(List<Double> center) {
        this.center = center;
    }

    public List<List<Double>> getPolygon() {
        return polygon;
    }

    public void setPolygon(List<List<Double>> polygon) {
        this.polygon = polygon;
    }

    public List<Integer> getFloors() {
        return floors;
    }

    public void setFloors(List<Integer> floors) {
        this.floors = floors;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }

    public static BuildingBuilder builder() {
        return new BuildingBuilder();
    }

    public static class BuildingBuilder {
        private String id;
        private String name;
        private String code;
        private String description;
        private List<Double> center;
        private List<List<Double>> polygon;
        private List<Integer> floors;
        private Map<String, Object> metadata;

        BuildingBuilder() {
        }

        public BuildingBuilder id(String id) {
            this.id = id;
            return this;
        }

        public BuildingBuilder name(String name) {
            this.name = name;
            return this;
        }

        public BuildingBuilder code(String code) {
            this.code = code;
            return this;
        }

        public BuildingBuilder description(String description) {
            this.description = description;
            return this;
        }

        public BuildingBuilder center(List<Double> center) {
            this.center = center;
            return this;
        }

        public BuildingBuilder polygon(List<List<Double>> polygon) {
            this.polygon = polygon;
            return this;
        }

        public BuildingBuilder floors(List<Integer> floors) {
            this.floors = floors;
            return this;
        }

        public BuildingBuilder metadata(Map<String, Object> metadata) {
            this.metadata = metadata;
            return this;
        }

        public Building build() {
            return new Building(id, name, code, description, center, polygon, floors, metadata);
        }
    }
}
