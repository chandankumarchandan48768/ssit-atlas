import { useState, useEffect } from 'react';
import api from '../api/axios';
import CampusScene3D from '../components/CampusScene3D';
import NavigationPanel from '../components/NavigationPanel';
import { buildingsData, navigationGraph, buildingToNodeMap } from '../data/CampusMapData';
import { findPath, generateDirections } from '../utils/pathfinding';

const MapPage = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [route, setRoute] = useState(null);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await api.get('/buildings');
                // Merge backend data with local data
                const mergedBuildings = buildingsData.map(localBuilding => {
                    const backendBuilding = response.data.find(b => b.code === localBuilding.code);
                    return backendBuilding ? { ...localBuilding, ...backendBuilding } : localBuilding;
                });
                setBuildings(mergedBuildings.length > 0 ? mergedBuildings : buildingsData);
            } catch (error) {
                console.error("Error fetching buildings:", error);
                // Use local data as fallback
                setBuildings(buildingsData);
            } finally {
                setLoading(false);
            }
        };

        fetchBuildings();
    }, []);

    // Handle route calculation
    const handleRouteCalculated = (startBuilding, endBuilding) => {
        const startNodeId = buildingToNodeMap[startBuilding.id];
        const endNodeId = buildingToNodeMap[endBuilding.id];

        if (!startNodeId || !endNodeId) {
            console.error('Building not mapped to navigation node');
            return;
        }

        const pathResult = findPath(navigationGraph, startNodeId, endNodeId);

        if (pathResult) {
            setRoute(pathResult);
            const dirs = generateDirections(pathResult, navigationGraph);
            setDirections(dirs);
        } else {
            console.error('No path found between buildings');
        }
    };

    // Clear route
    const handleClearRoute = () => {
        setRoute(null);
        setDirections([]);
    };

    // Handle building click
    const handleBuildingClick = (building) => {
        setSelectedBuilding(building);
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading 3D campus map...</p>
            </div>
        </div>
    );

    return (
        <div className="relative h-[calc(100vh-64px)] w-full bg-gray-900">
            {/* 3D Scene */}
            <CampusScene3D
                buildings={buildings}
                route={route}
                routeInfo={route}
                onBuildingClick={handleBuildingClick}
            />

            {/* Navigation Panel */}
            <NavigationPanel
                buildings={buildings}
                onRouteCalculated={handleRouteCalculated}
                onClearRoute={handleClearRoute}
            />

            {/* Building Info Panel */}
            {selectedBuilding && (
                <div className="fixed top-20 left-4 z-[1000] w-80 bg-white rounded-lg shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg">{selectedBuilding.name}</h3>
                                <p className="text-sm text-blue-100">{selectedBuilding.code}</p>
                            </div>
                            <button
                                onClick={() => setSelectedBuilding(null)}
                                className="hover:bg-blue-800 p-1 rounded"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        <p className="text-sm text-gray-700">{selectedBuilding.description}</p>
                        {selectedBuilding.floors && selectedBuilding.floors.length > 0 && (
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Floors:</span>
                                <span className="ml-2 text-gray-600">{selectedBuilding.floors.join(", ")}</span>
                            </div>
                        )}
                        {selectedBuilding.type && (
                            <div>
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                    {selectedBuilding.type.charAt(0).toUpperCase() + selectedBuilding.type.slice(1)}
                                </span>
                            </div>
                        )}
                        {selectedBuilding.height && (
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Height:</span>
                                <span className="ml-2 text-gray-600">{selectedBuilding.height}m</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Directions Panel */}
            {directions.length > 0 && (
                <div className="fixed bottom-4 left-4 z-[1000] w-80 bg-white rounded-lg shadow-2xl overflow-hidden max-h-96">
                    <div className="bg-blue-600 text-white p-3">
                        <h3 className="font-semibold">Turn-by-Turn Directions</h3>
                        <p className="text-sm text-blue-100">
                            {route.totalDistance ? `${Math.round(route.totalDistance)}m` : ''} •
                            {route.estimatedTime ? ` ${route.estimatedTime}s walk` : ''}
                        </p>
                    </div>
                    <div className="overflow-y-auto max-h-80 p-3 space-y-2">
                        {directions.map((dir, index) => (
                            <div key={index} className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                    {dir.step}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">{dir.instruction}</p>
                                    {dir.distance && (
                                        <p className="text-xs text-gray-500">{dir.distance}m</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Controls Info */}
            <div className="fixed bottom-4 right-4 z-[999] bg-white rounded-lg shadow-lg p-3 text-xs">
                <h4 className="font-semibold mb-2 text-gray-800">3D Controls</h4>
                <div className="space-y-1 text-gray-600">
                    <div><span className="font-medium">Left Click + Drag:</span> Rotate</div>
                    <div><span className="font-medium">Right Click + Drag:</span> Pan</div>
                    <div><span className="font-medium">Scroll:</span> Zoom</div>
                    <div><span className="font-medium">Click Building:</span> Info</div>
                </div>
            </div>
        </div >
    );
};

export default MapPage;
