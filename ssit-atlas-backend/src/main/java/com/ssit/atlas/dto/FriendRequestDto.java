package com.ssit.atlas.dto;

import jakarta.validation.constraints.NotBlank;

public class FriendRequestDto {
    @NotBlank(message = "Receiver ID is required")
    private String receiverId;

    public FriendRequestDto() {
    }

    public FriendRequestDto(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }
}
