import { useState, useEffect } from 'react';

const NavigationPanel = ({ buildings, onRouteCalculated, onClearRoute, userLocation, onUseMyLocation }) => {
    const [startBuildingId, setStartBuildingId] = useState('');
    const [endBuildingId, setEndBuildingId] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);

    const handleCalculate = () => {
        if (!startBuildingId || !endBuildingId) return;

        let start = buildings.find(b => b.id === startBuildingId);
        // Handle special "MY_LOCATION" case
        if (startBuildingId === 'MY_LOCATION') {
            start = 'MY_LOCATION';
        }

        const end = buildings.find(b => b.id === endBuildingId);

        if (start && end) {
            onRouteCalculated(start, end);
            setIsNavigating(true);
        }
    };

    const handleClear = () => {
        setStartBuildingId('');
        setEndBuildingId('');
        setIsNavigating(false);
        onClearRoute();
    };

    return (
        <div className="fixed top-20 left-4 z-[900] w-80 bg-white rounded-lg shadow-xl p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Navigation
            </h2>

            <div className="space-y-4">
                {/* Start Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <div className="flex gap-2">
                        <select
                            className="flex-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={startBuildingId}
                            onChange={(e) => setStartBuildingId(e.target.value)}
                        >
                            <option value="">Select Start Point</option>
                            <option value="MY_LOCATION" className="font-bold text-blue-600">📍 My Location</option>
                            {buildings.map(building => (
                                <option key={building.id} value={building.id}>
                                    {building.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={onUseMyLocation}
                            className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                            title="Get My Coordinates"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    {startBuildingId === 'MY_LOCATION' && userLocation && (
                        <p className="text-xs text-green-600 mt-1">
                            ✓ Location acquired ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
                        </p>
                    )}
                </div>

                {/* End Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={endBuildingId}
                        onChange={(e) => setEndBuildingId(e.target.value)}
                    >
                        <option value="">Select Destination</option>
                        {buildings.map(building => (
                            <option key={building.id} value={building.id}>
                                {building.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                    <button
                        onClick={handleCalculate}
                        disabled={!startBuildingId || !endBuildingId}
                        className={`flex-1 py-2 px-4 rounded text-white font-medium transition-colors ${!startBuildingId || !endBuildingId
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        Get Directions
                    </button>
                    {isNavigating && (
                        <button
                            onClick={handleClear}
                            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationPanel;
