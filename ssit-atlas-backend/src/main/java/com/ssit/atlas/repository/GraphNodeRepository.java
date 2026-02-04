package com.ssit.atlas.repository;

import com.ssit.atlas.model.GraphNode;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GraphNodeRepository extends MongoRepository<GraphNode, String> {
    List<GraphNode> findByBuildingId(String buildingId);
}
