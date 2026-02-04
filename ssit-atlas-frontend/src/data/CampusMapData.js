// Campus layout data for SSIT Tumakuru
// Coordinates based on reference campus map image
// Center: 13.3125° N, 77.1208° E

export const campusCenter = [13.3125, 77.1208];

// Buildings with accurate polygon coordinates based on blueprint
export const buildingsData = [
    {
        id: 'boys-hostel',
        name: 'BOYS HOSTEL (LUMBINI)',
        code: 'B-HOSTEL',
        type: 'hostel',
        description: 'Lumbini Boys Hostel - Student Accommodation',
        center: [13.31200, 77.12050],
        polygon: [
            [13.31250, 77.12020],
            [13.31250, 77.12080],
            [13.31150, 77.12080],
            [13.31150, 77.12020],
        ],
        floors: [1, 2, 3, 4],
        color: '#d4a574',
        height: 15,
        entrances: [[13.31200, 77.12080]],
        modelPath: '/3D-models/Lumbini_Boys_Hostel.obj',
        modelScale: 1.0,
        modelPosition: [0, 0, 0]
    },
    {
        id: 'girls-hostel',
        name: 'GIRLS HOSTEL',
        code: 'G-HOSTEL',
        type: 'hostel',
        description: 'Girls Hostel - Student Accommodation',
        center: [13.31330, 77.12050],
        polygon: [
            [13.31370, 77.12020],
            [13.31370, 77.12080],
            [13.31290, 77.12080],
            [13.31290, 77.12020],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31330, 77.12080]],
        modelPath: '/3D-models/girls_Hostel.obj',
        modelScale: 1.0,
        modelPosition: [0, 0, 0]
    },
    {
        id: 'library',
        name: 'LIBRARY',
        code: 'LIB',
        type: 'academic',
        description: 'Central Library - Learning Resource Center',
        center: [13.31270, 77.12150],
        polygon: [
            [13.31300, 77.12130],
            [13.31300, 77.12170],
            [13.31240, 77.12170],
            [13.31240, 77.12130],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31270, 77.12130]],
        modelPath: '/3D-models/Librery.obj',
        modelScale: 1.0,
        modelPosition: [0, 0, 0]
    },
    // Placeholder buildings for future development
    {
        id: 'main-stage',
        name: 'MAIN STAGE',
        code: 'STAGE',
        type: 'facility',
        description: 'Main Event Stage - Central Gathering Area',
        center: [13.31265, 77.12100],
        polygon: [
            [13.31285, 77.12090],
            [13.31285, 77.12110],
            [13.31245, 77.12110],
            [13.31245, 77.12090],
        ],
        floors: [1],
        color: '#8B4513',
        height: 3,
        entrances: [[13.31265, 77.12090]]
    },
    {
        id: 'parking-lot-main',
        name: 'MAIN PARKING LOT',
        code: 'PARK-1',
        type: 'parking',
        description: 'Main Parking Area',
        center: [13.31350, 77.12150],
        polygon: [
            [13.31380, 77.12130],
            [13.31380, 77.12170],
            [13.31320, 77.12170],
            [13.31320, 77.12130],
        ],
        floors: [1],
        color: '#606060',
        height: 0.5,
        entrances: [[13.31350, 77.12130]]
    },
    {
        id: 'parking-lot-secondary',
        name: 'SECONDARY PARKING',
        code: 'PARK-2',
        type: 'parking',
        description: 'Secondary Parking Area',
        center: [13.31160, 77.12150],
        polygon: [
            [13.31190, 77.12130],
            [13.31190, 77.12170],
            [13.31130, 77.12170],
            [13.31130, 77.12130],
        ],
        floors: [1],
        color: '#606060',
        height: 0.5,
        entrances: [[13.31160, 77.12130]]
    },
    // Future buildings - commented out until 3D models are available
    // Uncomment and update coordinates when ready to add
    /*
    {
        id: 'step-building',
        name: 'STEP BUILDING',
        code: 'STEP',
        type: 'academic',
        description: 'STEP Building',
        center: [13.31200, 77.12150],
        polygon: [
            [13.31220, 77.12130],
            [13.31220, 77.12170],
            [13.31180, 77.12170],
            [13.31180, 77.12130],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31200, 77.12130]],
        // modelPath: '/3D-models/step_building.obj',
        // modelScale: 0.01,
    },
    {
        id: 'admin-block',
        name: 'ADMIN BLOCK',
        code: 'ADMIN',
        type: 'administrative',
        description: 'Administrative Building',
        center: [13.31230, 77.12100],
        polygon: [
            [13.31250, 77.12080],
            [13.31250, 77.12120],
            [13.31210, 77.12120],
            [13.31210, 77.12080],
        ],
        floors: [1, 2],
        color: '#d4a574',
        height: 8,
        entrances: [[13.31230, 77.12080]],
        // modelPath: '/3D-models/admin_block.obj',
        // modelScale: 0.01,
    },
    {
        id: 'sir-mv-block',
        name: 'SIR M.V BLOCK',
        code: 'MV',
        type: 'academic',
        description: 'Sir M.V Block',
        center: [13.31300, 77.12100],
        polygon: [
            [13.31320, 77.12080],
            [13.31320, 77.12120],
            [13.31280, 77.12120],
            [13.31280, 77.12080],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31300, 77.12080]],
        // modelPath: '/3D-models/sir_mv_block.obj',
        // modelScale: 0.01,
    },
    */
];


// Navigation graph - walkable paths between points
export const navigationGraph = {
    nodes: [
        // Main entrance area
        { id: 'n1', name: 'Main Gate', lat: 13.31150, lng: 77.12100 },
        { id: 'n2', name: 'Central Junction', lat: 13.31250, lng: 77.12100 },

        // Building access points
        { id: 'n3', name: 'Boys Hostel Junction', lat: 13.31200, lng: 77.12080 },
        { id: 'n4', name: 'Girls Hostel Junction', lat: 13.31330, lng: 77.12080 },
        { id: 'n5', name: 'Library Junction', lat: 13.31270, lng: 77.12130 },
        { id: 'n6', name: 'Stage Junction', lat: 13.31265, lng: 77.12100 },
        { id: 'n7', name: 'Main Parking Junction', lat: 13.31350, lng: 77.12130 },
        { id: 'n8', name: 'Secondary Parking Junction', lat: 13.31160, lng: 77.12130 },

        // Building entrances
        { id: 'e_boys_hostel', name: 'Boys Hostel Entrance', lat: 13.31200, lng: 77.12080 },
        { id: 'e_girls_hostel', name: 'Girls Hostel Entrance', lat: 13.31330, lng: 77.12080 },
        { id: 'e_library', name: 'Library Entrance', lat: 13.31270, lng: 77.12130 },
        { id: 'e_stage', name: 'Stage Entrance', lat: 13.31265, lng: 77.12090 },
        { id: 'e_parking_main', name: 'Main Parking Entrance', lat: 13.31350, lng: 77.12130 },
        { id: 'e_parking_sec', name: 'Secondary Parking Entrance', lat: 13.31160, lng: 77.12130 },
    ],
    edges: [
        // Main path connections
        { from: 'n1', to: 'n2', distance: 100 },
        { from: 'n2', to: 'n6', distance: 15 },
        { from: 'n2', to: 'n3', distance: 50 },
        { from: 'n2', to: 'n5', distance: 40 },
        { from: 'n3', to: 'n4', distance: 130 },
        { from: 'n4', to: 'n7', distance: 60 },
        { from: 'n5', to: 'n7', distance: 80 },
        { from: 'n2', to: 'n8', distance: 100 },

        // Building entrance connections
        { from: 'n3', to: 'e_boys_hostel', distance: 5 },
        { from: 'n4', to: 'e_girls_hostel', distance: 5 },
        { from: 'n5', to: 'e_library', distance: 5 },
        { from: 'n6', to: 'e_stage', distance: 10 },
        { from: 'n7', to: 'e_parking_main', distance: 5 },
        { from: 'n8', to: 'e_parking_sec', distance: 5 },
    ]
};

// Map all building IDs to their nearest navigation nodes
export const buildingToNodeMap = {
    'boys-hostel': 'e_boys_hostel',
    'girls-hostel': 'e_girls_hostel',
    'library': 'e_library',
    'main-stage': 'e_stage',
    'parking-lot-main': 'e_parking_main',
    'parking-lot-secondary': 'e_parking_sec',
};

// Areas for visual reference
export const areas = {
    greenSpaces: [
        {
            name: 'Central Lawn',
            polygon: [
                [13.31240, 77.12100],
                [13.31260, 77.12100],
                [13.31260, 77.12110],
                [13.31240, 77.12110],
            ]
        }
    ],
    roads: [
        {
            name: 'Main Road',
            path: [
                [13.31150, 77.12130],
                [13.31370, 77.12130],
            ],
            width: 8
        }
    ]
};

export default {
    campusCenter,
    buildingsData,
    navigationGraph,
    buildingToNodeMap,
    areas
};
