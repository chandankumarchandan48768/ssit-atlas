package com.ssit.atlas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "graph_edges")
public class GraphEdge {
    @Id
    private String id;
    private String fromNodeId;
    private String toNodeId;
    private Double weight; // distance in meters
    private boolean isBidirectional;

    public GraphEdge() {
    }

    public GraphEdge(String id, String fromNodeId, String toNodeId, Double weight, boolean isBidirectional) {
        this.id = id;
        this.fromNodeId = fromNodeId;
        this.toNodeId = toNodeId;
        this.weight = weight;
        this.isBidirectional = isBidirectional;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFromNodeId() {
        return fromNodeId;
    }

    public void setFromNodeId(String fromNodeId) {
        this.fromNodeId = fromNodeId;
    }

    public String getToNodeId() {
        return toNodeId;
    }

    public void setToNodeId(String toNodeId) {
        this.toNodeId = toNodeId;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public boolean isBidirectional() {
        return isBidirectional;
    }

    public void setBidirectional(boolean bidirectional) {
        isBidirectional = bidirectional;
    }

    public static GraphEdgeBuilder builder() {
        return new GraphEdgeBuilder();
    }

    public static class GraphEdgeBuilder {
        private String id;
        private String fromNodeId;
        private String toNodeId;
        private Double weight;
        private boolean isBidirectional;

        GraphEdgeBuilder() {
        }

        public GraphEdgeBuilder id(String id) {
            this.id = id;
            return this;
        }

        public GraphEdgeBuilder fromNodeId(String fromNodeId) {
            this.fromNodeId = fromNodeId;
            return this;
        }

        public GraphEdgeBuilder toNodeId(String toNodeId) {
            this.toNodeId = toNodeId;
            return this;
        }

        public GraphEdgeBuilder weight(Double weight) {
            this.weight = weight;
            return this;
        }

        public GraphEdgeBuilder isBidirectional(boolean isBidirectional) {
            this.isBidirectional = isBidirectional;
            return this;
        }

        public GraphEdge build() {
            return new GraphEdge(id, fromNodeId, toNodeId, weight, isBidirectional);
        }
    }
}
