package com.ssit.atlas.controller;

import com.ssit.atlas.model.Building;
import com.ssit.atlas.service.BuildingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {

    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @GetMapping
    public List<Building> getAllBuildings() {
        return buildingService.getAllBuildings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Building> getBuildingById(@PathVariable String id) {
        return buildingService.getBuildingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('MANAGEMENT_TEAM', 'ADMIN')")
    public ResponseEntity<Building> createBuilding(@RequestBody Building building) {
        return ResponseEntity.ok(buildingService.createBuilding(building));
    }

    // Add update and delete if missing in service, but assuming standard operations
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('MANAGEMENT_TEAM', 'ADMIN')")
    public ResponseEntity<Building> updateBuilding(@PathVariable String id, @RequestBody Building building) {
        // Assuming service has update method, if not I might need to add it.
        // Checking BuildingService...
        return ResponseEntity.ok(buildingService.updateBuilding(id, building));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBuilding(@PathVariable String id) {
        buildingService.deleteBuilding(id);
        return ResponseEntity.noContent().build();
    }
}
