package com.ssit.atlas.controller;

import com.ssit.atlas.model.LostItem;
import com.ssit.atlas.service.LostItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public ResponseEntity<LostItem> createLostItem(@RequestBody LostItem item) {
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
