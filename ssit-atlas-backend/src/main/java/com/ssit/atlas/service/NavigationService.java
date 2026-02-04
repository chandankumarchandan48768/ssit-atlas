package com.ssit.atlas.service;

import com.ssit.atlas.model.GraphEdge;
import com.ssit.atlas.model.GraphNode;
import com.ssit.atlas.repository.GraphEdgeRepository;
import com.ssit.atlas.repository.GraphNodeRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class NavigationService {

    private final GraphNodeRepository nodeRepository;
    private final GraphEdgeRepository edgeRepository;

    public NavigationService(GraphNodeRepository nodeRepository, GraphEdgeRepository edgeRepository) {
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
    }

    public List<GraphNode> findShortestPath(String startNodeId, String endNodeId) {
        // Load all nodes/edges (in a real large-scale app, we might load a subgraph or
        // cache this)
        List<GraphNode> nodes = nodeRepository.findAll();
        List<GraphEdge> edges = edgeRepository.findAll();

        Map<String, GraphNode> nodeMap = nodes.stream()
                .collect(Collectors.toMap(GraphNode::getId, node -> node));

        // Build adjacency list
        Map<String, List<Edge>> adjacencyList = new HashMap<>();
        for (GraphEdge edge : edges) {
            adjacencyList.computeIfAbsent(edge.getFromNodeId(), k -> new ArrayList<>())
                    .add(new Edge(edge.getToNodeId(), edge.getWeight()));

            if (edge.isBidirectional()) {
                adjacencyList.computeIfAbsent(edge.getToNodeId(), k -> new ArrayList<>())
                        .add(new Edge(edge.getFromNodeId(), edge.getWeight()));
            }
        }

        // Dijkstra's Algorithm
        Map<String, Double> distances = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        PriorityQueue<NodeDistance> queue = new PriorityQueue<>(Comparator.comparingDouble(nd -> nd.distance));
        Set<String> visited = new HashSet<>();

        // Initialize distances
        for (GraphNode node : nodes) {
            distances.put(node.getId(), Double.MAX_VALUE);
        }
        distances.put(startNodeId, 0.0);
        queue.add(new NodeDistance(startNodeId, 0.0));

        while (!queue.isEmpty()) {
            NodeDistance current = queue.poll();
            String u = current.nodeId;

            if (visited.contains(u))
                continue;
            visited.add(u);

            if (u.equals(endNodeId))
                break;

            if (adjacencyList.containsKey(u)) {
                for (Edge neighbor : adjacencyList.get(u)) {
                    String v = neighbor.targetNodeId;
                    double weight = neighbor.weight;
                    double newDist = distances.get(u) + weight;

                    if (newDist < distances.get(v)) {
                        distances.put(v, newDist);
                        previous.put(v, u);
                        queue.add(new NodeDistance(v, newDist));
                    }
                }
            }
        }

        // Reconstruct path
        List<GraphNode> path = new ArrayList<>();
        String currentId = endNodeId;

        if (!previous.containsKey(currentId) && !startNodeId.equals(endNodeId)) {
            return Collections.emptyList(); // No path found
        }

        while (currentId != null) {
            path.add(nodeMap.get(currentId));
            currentId = previous.get(currentId);
        }
        Collections.reverse(path);

        return path;
    }

    // Helper classes
    private static class Edge {
        final String targetNodeId;
        final double weight;

        public Edge(String targetNodeId, double weight) {
            this.targetNodeId = targetNodeId;
            this.weight = weight;
        }
    }

    private static class NodeDistance {
        final String nodeId;
        final double distance;

        public NodeDistance(String nodeId, double distance) {
            this.nodeId = nodeId;
            this.distance = distance;
        }
    }
}
