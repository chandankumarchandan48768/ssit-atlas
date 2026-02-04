package com.ssit.atlas.repository;

import com.ssit.atlas.model.GraphEdge;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GraphEdgeRepository extends MongoRepository<GraphEdge, String> {
}
