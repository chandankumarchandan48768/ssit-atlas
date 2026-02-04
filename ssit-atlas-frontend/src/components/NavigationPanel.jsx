import { useState, useEffect } from 'react';
import { Search, Navigation, X, MapPin, Clock } from 'lucide-react';

const NavigationPanel = ({ buildings, onRouteCalculated, onClearRoute }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);
    const [showStartSuggestions, setShowStartSuggestions] = useState(false);
    const [showEndSuggestions, setShowEndSuggestions] = useState(false);
    const [routeInfo, setRouteInfo] = useState(null);

    // Filter buildings based on search input
    const filterBuildings = (query) => {
        if (!query || query.length < 1) return [];
        const lowerQuery = query.toLowerCase();
        return buildings.filter(building =>
            building.name.toLowerCase().includes(lowerQuery) ||
            building.code.toLowerCase().includes(lowerQuery)
        ).slice(0, 5);
    };

    // Handle start location input
    const handleStartChange = (e) => {
        const value = e.target.value;
        setStartLocation(value);
        setStartSuggestions(filterBuildings(value));
        setShowStartSuggestions(true);
    };

    // Handle end location input
    const handleEndChange = (e) => {
        const value = e.target.value;
        setEndLocation(value);
        setEndSuggestions(filterBuildings(value));
        setShowEndSuggestions(true);
    };

    // Select start location from suggestions
    const selectStartLocation = (building) => {
        setStartLocation(building.name);
        setShowStartSuggestions(false);
    };

    // Select end location from suggestions
    const selectEndLocation = (building) => {
        setEndLocation(building.name);
        setShowEndSuggestions(false);
    };

    // Calculate route
    const handleGetDirections = () => {
        const startBuilding = buildings.find(b => b.name === startLocation);
        const endBuilding = buildings.find(b => b.name === endLocation);

        if (startBuilding && endBuilding) {
            onRouteCalculated(startBuilding, endBuilding);
        }
    };

    // Clear route
    const handleClearRoute = () => {
        setStartLocation('');
        setEndLocation('');
        setRouteInfo(null);
        onClearRoute();
    };

    // Swap locations
    const handleSwapLocations = () => {
        const temp = startLocation;
        setStartLocation(endLocation);
        setEndLocation(temp);
    };

    return (
        <>
            {/* Floating Navigation Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-20 right-4 z-[1000] bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
                title="Navigation"
            >
                <Navigation className="w-6 h-6" />
            </button>

            {/* Navigation Panel */}
            {isOpen && (
                <div className="fixed top-20 right-4 z-[1000] w-96 bg-white rounded-lg shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Navigation className="w-5 h-5" />
                            Campus Navigation
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-blue-700 p-1 rounded"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                        {/* Start Location */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Starting Point
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={startLocation}
                                    onChange={handleStartChange}
                                    onFocus={() => setShowStartSuggestions(true)}
                                    placeholder="Search for a building..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Start Suggestions */}
                            {showStartSuggestions && startSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {startSuggestions.map((building) => (
                                        <button
                                            key={building.id}
                                            onClick={() => selectStartLocation(building)}
                                            className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-2"
                                        >
                                            <MapPin className="w-4 h-4 text-blue-600" />
                                            <div>
                                                <div className="font-medium">{building.name}</div>
                                                <div className="text-xs text-gray-500">{building.code}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Swap Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleSwapLocations}
                                className="p-2 hover:bg-gray-100 rounded-full"
                                title="Swap locations"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                            </button>
                        </div>

                        {/* End Location */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Destination
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={endLocation}
                                    onChange={handleEndChange}
                                    onFocus={() => setShowEndSuggestions(true)}
                                    placeholder="Search for a building..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* End Suggestions */}
                            {showEndSuggestions && endSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {endSuggestions.map((building) => (
                                        <button
                                            key={building.id}
                                            onClick={() => selectEndLocation(building)}
                                            className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-2"
                                        >
                                            <MapPin className="w-4 h-4 text-red-600" />
                                            <div>
                                                <div className="font-medium">{building.name}</div>
                                                <div className="text-xs text-gray-500">{building.code}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Get Directions Button */}
                        <button
                            onClick={handleGetDirections}
                            disabled={!startLocation || !endLocation}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Get Directions
                        </button>

                        {/* Clear Route Button */}
                        {(startLocation || endLocation) && (
                            <button
                                onClick={handleClearRoute}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg transition-colors"
                            >
                                Clear
                            </button>
                        )}

                        {/* Route Info */}
                        {routeInfo && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    <span className="font-medium">Distance:</span>
                                    <span>{routeInfo.distance}m</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                    <span className="font-medium">Estimated Time:</span>
                                    <span>{routeInfo.time} seconds</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default NavigationPanel;
