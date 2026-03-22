package com.ssit.atlas.controller;

import com.ssit.atlas.model.LostItem;
import com.ssit.atlas.service.LostItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/lost-found")
public class LostItemController {

    private final LostItemService lostItemService;

    public LostItemController(LostItemService lostItemService) {
        this.lostItemService = lostItemService;
    }

    @GetMapping
    public List<LostItem> getLostItems(
            @RequestParam(required = false) LostItem.ItemStatus status) {
        if (status != null) {
            return lostItemService.getLostItemsByStatus(status);
        }
        return lostItemService.getAllLostItems();
    }

    /**
     * Accept either JSON body or multipart form with optional image file.
     */
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<LostItem> createLostItemMultipart(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam String contactInfo,
            @RequestParam(defaultValue = "LOST") String status,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(required = false) MultipartFile image) throws IOException {

        LostItem item = new LostItem();
        item.setTitle(title);
        item.setDescription(description);
        item.setLocation(location);
        item.setContactInfo(contactInfo);
        item.setStatus(LostItem.ItemStatus.valueOf(status));
        item.setLatitude(latitude);
        item.setLongitude(longitude);

        // Save image locally if provided
        if (image != null && !image.isEmpty()) {
            String uploadDir = "uploads/lost-found/";
            Files.createDirectories(Paths.get(uploadDir));
            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, filename);
            Files.copy(image.getInputStream(), filePath);
            item.setImageUrl("/uploads/lost-found/" + filename);
        }

        return ResponseEntity.ok(lostItemService.createLostItem(item));
    }

    /**
     * JSON body fallback (existing behaviour – kept for backward compat).
     */
    @PostMapping(consumes = {"application/json"})
    public ResponseEntity<LostItem> createLostItemJson(@RequestBody LostItem item) {
        return ResponseEntity.ok(lostItemService.createLostItem(item));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LostItem> updateStatus(
            @PathVariable String id,
            @RequestParam LostItem.ItemStatus status) {
        return lostItemService.updateStatus(id, status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
