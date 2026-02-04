package com.ssit.atlas.dto;

import com.ssit.atlas.model.FriendLocation;

public class LocationUpdateRequest {
    private String nodeId;
    private FriendLocation.Visibility visibility;

    public LocationUpdateRequest() {
    }

    public LocationUpdateRequest(String nodeId, FriendLocation.Visibility visibility) {
        this.nodeId = nodeId;
        this.visibility = visibility;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public FriendLocation.Visibility getVisibility() {
        return visibility;
    }

    public void setVisibility(FriendLocation.Visibility visibility) {
        this.visibility = visibility;
    }
}
