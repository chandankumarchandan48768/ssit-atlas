package com.ssit.atlas.controller;

import com.ssit.atlas.model.PlacementRecord;
import com.ssit.atlas.model.User;
import com.ssit.atlas.repository.UserRepository;
import com.ssit.atlas.service.PlacementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {

    private final PlacementService placementService;
    private final UserRepository userRepository;

    public PlacementController(PlacementService placementService, UserRepository userRepository) {
        this.placementService = placementService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('PLACEMENT_DEPARTMENT', 'ADMIN')")
    public ResponseEntity<PlacementRecord> createPlacement(@RequestBody PlacementRecord record) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElseThrow();
        record.setCreatedByUserId(currentUser.getId());
        return ResponseEntity.ok(placementService.createPlacementRecord(record));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('PLACEMENT_DEPARTMENT', 'ADMIN')")
    public ResponseEntity<PlacementRecord> updatePlacement(@PathVariable String id,
            @RequestBody PlacementRecord record) {
        return ResponseEntity.ok(placementService.updatePlacementRecord(id, record));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('PLACEMENT_DEPARTMENT', 'ADMIN')")
    public ResponseEntity<Void> deletePlacement(@PathVariable String id) {
        placementService.deletePlacementRecord(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/department/{department}")
    public ResponseEntity<List<PlacementRecord>> getByDepartment(@PathVariable String department) {
        return ResponseEntity.ok(placementService.getPlacementsByDepartment(department));
    }

    @GetMapping("/year/{year}")
    public ResponseEntity<List<PlacementRecord>> getByYear(@PathVariable String year) {
        return ResponseEntity.ok(placementService.getPlacementsByYear(year));
    }

    @GetMapping("/search")
    public ResponseEntity<List<PlacementRecord>> searchByCompany(@RequestParam String company) {
        return ResponseEntity.ok(placementService.searchByCompany(company));
    }
}
