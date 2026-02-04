package com.ssit.atlas.service;

import com.ssit.atlas.model.LostItem;
import com.ssit.atlas.repository.LostItemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LostItemService {
    private final LostItemRepository lostItemRepository;

    public LostItemService(LostItemRepository lostItemRepository) {
        this.lostItemRepository = lostItemRepository;
    }

    public List<LostItem> getAllLostItems() {
        // Default to showing only LOST items or all? Requirement says filter by status.
        return lostItemRepository.findAll();
    }

    public List<LostItem> getLostItemsByStatus(LostItem.ItemStatus status) {
        return lostItemRepository.findByStatus(status);
    }

    public LostItem createLostItem(LostItem item) {
        item.setCreatedAt(LocalDateTime.now());
        item.setStatus(LostItem.ItemStatus.LOST);
        return lostItemRepository.save(item);
    }

    public Optional<LostItem> updateStatus(String id, LostItem.ItemStatus status) {
        var item = lostItemRepository.findById(id);
        if (item.isPresent()) {
            var i = item.get();
            i.setStatus(status);
            return Optional.of(lostItemRepository.save(i));
        }
        return Optional.empty();
    }
}
