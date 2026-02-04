package com.ssit.atlas.dto;

public class NavigationRequest {
    private String sourceNodeId;
    private String targetNodeId;

    public NavigationRequest() {
    }

    public NavigationRequest(String sourceNodeId, String targetNodeId) {
        this.sourceNodeId = sourceNodeId;
        this.targetNodeId = targetNodeId;
    }

    public String getSourceNodeId() {
        return sourceNodeId;
    }

    public void setSourceNodeId(String sourceNodeId) {
        this.sourceNodeId = sourceNodeId;
    }

    public String getTargetNodeId() {
        return targetNodeId;
    }

    public void setTargetNodeId(String targetNodeId) {
        this.targetNodeId = targetNodeId;
    }

    public static NavigationRequestBuilder builder() {
        return new NavigationRequestBuilder();
    }

    public static class NavigationRequestBuilder {
        private String sourceNodeId;
        private String targetNodeId;

        NavigationRequestBuilder() {
        }

        public NavigationRequestBuilder sourceNodeId(String sourceNodeId) {
            this.sourceNodeId = sourceNodeId;
            return this;
        }

        public NavigationRequestBuilder targetNodeId(String targetNodeId) {
            this.targetNodeId = targetNodeId;
            return this;
        }

        public NavigationRequest build() {
            return new NavigationRequest(sourceNodeId, targetNodeId);
        }
    }
}
