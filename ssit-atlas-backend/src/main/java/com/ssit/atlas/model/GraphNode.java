package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "graph_nodes")
public class GraphNode {
    @Id
    private String id;
    private String buildingId;
    private String roomId; // Nullable for corridors
    private String label;

    private List<Double> coordinates; // [lat, lng] or [lat, lng, z]
    private NodeType type;

    public enum NodeType {
        ROOM, CORRIDOR, STAIRCASE, LIFT, ENTRY_EXIT
    }

    public GraphNode() {
    }

    public GraphNode(String id, String buildingId, String roomId, String label, List<Double> coordinates,
            NodeType type) {
        this.id = id;
        this.buildingId = buildingId;
        this.roomId = roomId;
        this.label = label;
        this.coordinates = coordinates;
        this.type = type;
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

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<Double> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }

    public NodeType getType() {
        return type;
    }

    public void setType(NodeType type) {
        this.type = type;
    }

    public static GraphNodeBuilder builder() {
        return new GraphNodeBuilder();
    }

    public static class GraphNodeBuilder {
        private String id;
        private String buildingId;
        private String roomId;
        private String label;
        private List<Double> coordinates;
        private NodeType type;

        GraphNodeBuilder() {
        }

        public GraphNodeBuilder id(String id) {
            this.id = id;
            return this;
        }

        public GraphNodeBuilder buildingId(String buildingId) {
            this.buildingId = buildingId;
            return this;
        }

        public GraphNodeBuilder roomId(String roomId) {
            this.roomId = roomId;
            return this;
        }

        public GraphNodeBuilder label(String label) {
            this.label = label;
            return this;
        }

        public GraphNodeBuilder coordinates(List<Double> coordinates) {
            this.coordinates = coordinates;
            return this;
        }

        public GraphNodeBuilder type(NodeType type) {
            this.type = type;
            return this;
        }

        public GraphNode build() {
            return new GraphNode(id, buildingId, roomId, label, coordinates, type);
        }
    }
}
