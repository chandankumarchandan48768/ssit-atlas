package com.ssit.atlas.controller;

import com.ssit.atlas.dto.NavigationRequest;
import com.ssit.atlas.model.GraphEdge;
import com.ssit.atlas.model.GraphNode;
import com.ssit.atlas.repository.GraphEdgeRepository;
import com.ssit.atlas.repository.GraphNodeRepository;
import com.ssit.atlas.service.NavigationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/navigation")
public class NavigationController {

    private final NavigationService navigationService;
    private final GraphNodeRepository nodeRepository;
    private final GraphEdgeRepository edgeRepository;

    public NavigationController(NavigationService navigationService, GraphNodeRepository nodeRepository,
            GraphEdgeRepository edgeRepository) {
        this.navigationService = navigationService;
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
    }

    @GetMapping("/nodes")
    public List<GraphNode> getAllNodes() {
        return nodeRepository.findAll();
    }

    @GetMapping("/edges")
    public List<GraphEdge> getAllEdges() {
        return edgeRepository.findAll();
    }

    @PostMapping("/route")
    public ResponseEntity<List<GraphNode>> getShortestPath(@RequestBody NavigationRequest request) {
        return ResponseEntity.ok(
                navigationService.findShortestPath(request.getSourceNodeId(), request.getTargetNodeId()));
    }
}
