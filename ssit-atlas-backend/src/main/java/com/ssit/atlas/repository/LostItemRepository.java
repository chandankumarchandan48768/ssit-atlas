package com.ssit.atlas.repository;

import com.ssit.atlas.model.LostItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LostItemRepository extends MongoRepository<LostItem, String> {
    List<LostItem> findByStatus(LostItem.ItemStatus status);
}
