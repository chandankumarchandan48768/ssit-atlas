// A* Pathfinding implementation for campus navigation

// Priority Queue implementation
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

// Heuristic function for A* (Euclidean distance)
function heuristic(node1, node2) {
    return calculateDistance(node1.lat, node1.lng, node2.lat, node2.lng);
}

// Build adjacency list from navigation graph
function buildGraph(navigationGraph) {
    const graph = new Map();

    // Initialize all nodes
    navigationGraph.nodes.forEach(node => {
        graph.set(node.id, { node, neighbors: [] });
    });

    // Add edges (bidirectional)
    navigationGraph.edges.forEach(edge => {
        const fromNode = graph.get(edge.from);
        const toNode = graph.get(edge.to);

        if (fromNode && toNode) {
            fromNode.neighbors.push({
                nodeId: edge.to,
                distance: edge.distance
            });
            toNode.neighbors.push({
                nodeId: edge.from,
                distance: edge.distance
            });
        }
    });

    return graph;
}

// A* pathfinding algorithm
export function findPath(navigationGraph, startNodeId, endNodeId) {
    const graph = buildGraph(navigationGraph);
    const startNode = graph.get(startNodeId);
    const endNode = graph.get(endNodeId);

    if (!startNode || !endNode) {
        return null;
    }

    const openSet = new PriorityQueue();
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    // Initialize scores
    navigationGraph.nodes.forEach(node => {
        gScore.set(node.id, Infinity);
        fScore.set(node.id, Infinity);
    });

    gScore.set(startNodeId, 0);
    fScore.set(startNodeId, heuristic(startNode.node, endNode.node));
    openSet.enqueue(startNodeId, fScore.get(startNodeId));

    while (!openSet.isEmpty()) {
        const current = openSet.dequeue().element;

        if (current === endNodeId) {
            // Reconstruct path
            return reconstructPath(cameFrom, current, graph);
        }

        closedSet.add(current);
        const currentNode = graph.get(current);

        currentNode.neighbors.forEach(neighbor => {
            if (closedSet.has(neighbor.nodeId)) {
                return;
            }

            const tentativeGScore = gScore.get(current) + neighbor.distance;

            if (tentativeGScore < gScore.get(neighbor.nodeId)) {
                cameFrom.set(neighbor.nodeId, current);
                gScore.set(neighbor.nodeId, tentativeGScore);

                const neighborNode = graph.get(neighbor.nodeId);
                const h = heuristic(neighborNode.node, endNode.node);
                fScore.set(neighbor.nodeId, tentativeGScore + h);

                openSet.enqueue(neighbor.nodeId, fScore.get(neighbor.nodeId));
            }
        });
    }

    return null; // No path found
}

// Reconstruct the path from start to end
function reconstructPath(cameFrom, current, graph) {
    const path = [current];
    const coordinates = [];
    let totalDistance = 0;

    while (cameFrom.has(current)) {
        const previous = current;
        current = cameFrom.get(current);
        path.unshift(current);

        // Calculate distance between nodes
        const currentNodeData = graph.get(current).node;
        const previousNodeData = graph.get(previous).node;
        totalDistance += calculateDistance(
            currentNodeData.lat,
            currentNodeData.lng,
            previousNodeData.lat,
            previousNodeData.lng
        );
    }

    // Convert node IDs to coordinates
    path.forEach(nodeId => {
        const nodeData = graph.get(nodeId).node;
        coordinates.push([nodeData.lat, nodeData.lng]);
    });

    return {
        path,
        coordinates,
        totalDistance,
        estimatedTime: Math.ceil(totalDistance / 1.4) // Assuming 1.4 m/s walking speed (5 km/h)
    };
}

// Find nearest node to a given coordinate
export function findNearestNode(navigationGraph, lat, lng) {
    let nearestNode = null;
    let minDistance = Infinity;

    navigationGraph.nodes.forEach(node => {
        const distance = calculateDistance(lat, lng, node.lat, node.lng);
        if (distance < minDistance) {
            minDistance = distance;
            nearestNode = node;
        }
    });

    return nearestNode;
}

// Generate turn-by-turn directions
export function generateDirections(pathResult, graph) {
    if (!pathResult || !pathResult.path || pathResult.path.length < 2) {
        return [];
    }

    const directions = [];
    const nodes = pathResult.path.map(nodeId =>
        graph.nodes.find(n => n.id === nodeId)
    );

    for (let i = 0; i < nodes.length - 1; i++) {
        const current = nodes[i];
        const next = nodes[i + 1];
        const distance = calculateDistance(
            current.lat,
            current.lng,
            next.lat,
            next.lng
        );

        let instruction = '';
        if (i === 0) {
            instruction = `Start at ${current.name}`;
        } else if (i === nodes.length - 2) {
            instruction = `Arrive at ${next.name}`;
        } else {
            instruction = `Continue to ${next.name}`;
        }

        directions.push({
            step: i + 1,
            instruction,
            distance: Math.round(distance),
            from: current.name,
            to: next.name
        });
    }

    return directions;
}

export default {
    findPath,
    findNearestNode,
    generateDirections,
    calculateDistance
};
