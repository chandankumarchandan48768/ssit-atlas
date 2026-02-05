package com.ssit.atlas.service;

import com.ssit.atlas.model.Building;
import com.ssit.atlas.repository.BuildingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BuildingService {
    private final BuildingRepository buildingRepository;

    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public Optional<Building> getBuildingById(String id) {
        return buildingRepository.findById(id);
    }

    public Building createBuilding(Building building) {
        return buildingRepository.save(building);
    }

    public Building updateBuilding(String id, Building buildingDetails) {
        return buildingRepository.findById(id).map(building -> {
            building.setName(buildingDetails.getName());
            building.setCode(buildingDetails.getCode());
            building.setDescription(buildingDetails.getDescription());
            building.setCenter(buildingDetails.getCenter());
            building.setPolygon(buildingDetails.getPolygon());
            building.setFloors(buildingDetails.getFloors());
            building.setMetadata(buildingDetails.getMetadata());
            return buildingRepository.save(building);
        }).orElseThrow(() -> new RuntimeException("Building not found"));
    }

    public void deleteBuilding(String id) {
        buildingRepository.deleteById(id);
    }
}
