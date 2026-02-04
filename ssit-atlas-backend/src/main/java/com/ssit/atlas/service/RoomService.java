package com.ssit.atlas.service;

import com.ssit.atlas.model.Room;
import com.ssit.atlas.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(String id) {
        return roomRepository.findById(id);
    }

    public List<Room> getRoomsByBuilding(String buildingId) {
        return roomRepository.findByBuildingId(buildingId);
    }
}
