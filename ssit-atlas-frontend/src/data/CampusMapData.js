// Campus layout data for SSIT Tumakuru
// Coordinates based on reference campus map image
// Center: 13.3125° N, 77.1208° E

export const campusCenter = [13.3125, 77.1208];

// Buildings with accurate polygon coordinates
export const buildingsData = [
    {
        id: 'hostel',
        name: 'HOSTEL',
        code: 'HOSTEL',
        type: 'hostel',
        description: 'Student Hostel',
        center: [13.31285, 77.12035],
        polygon: [
            [13.31320, 77.11995],
            [13.31320, 77.12075],
            [13.31250, 77.12075],
            [13.31250, 77.11995],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31285, 77.12075]]
    },
    {
        id: 'girls-hostel',
        name: 'GIRLS HOSTEL',
        code: 'G-HOSTEL',
        type: 'hostel',
        description: 'Girls Hostel',
        center: [13.31325, 77.12035],
        polygon: [
            [13.31355, 77.11995],
            [13.31355, 77.12075],
            [13.31295, 77.12075],
            [13.31295, 77.11995],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31325, 77.12075]]
    },
    {
        id: 'library',
        name: 'LIBRARY',
        code: 'LIB',
        type: 'academic',
        description: 'Central Library',
        center: [13.31250, 77.12080],
        polygon: [
            [13.31270, 77.12065],
            [13.31270, 77.12095],
            [13.31230, 77.12095],
            [13.31230, 77.12065],
        ],
        floors: [1, 2],
        color: '#d4a574',
        height: 8,
        entrances: [[13.31250, 77.12095]]
    },
    {
        id: 'main-stage',
        name: 'MAIN STAGE',
        code: 'STAGE',
        type: 'facility',
        description: 'Main Event Stage',
        center: [13.31240, 77.12130],
        polygon: [
            [13.31255, 77.12115],
            [13.31255, 77.12145],
            [13.31225, 77.12145],
            [13.31225, 77.12115],
        ],
        floors: [1],
        color: '#d4a574',
        height: 4,
        entrances: [[13.31240, 77.12115]]
    },
    {
        id: 'admin',
        name: 'ADMIN',
        code: 'ADMIN',
        type: 'administrative',
        description: 'Administrative Block',
        center: [13.31215, 77.12130],
        polygon: [
            [13.31235, 77.12110],
            [13.31235, 77.12150],
            [13.31195, 77.12150],
            [13.31195, 77.12110],
        ],
        floors: [1, 2],
        color: '#d4a574',
        height: 8,
        entrances: [[13.31215, 77.12110]]
    },
    {
        id: 'eee-block',
        name: 'EEE BLOCK',
        code: 'EEE',
        type: 'academic',
        description: 'Electrical and Electronics Engineering Department',
        center: [13.31370, 77.12130],
        polygon: [
            [13.31390, 77.12110],
            [13.31390, 77.12150],
            [13.31350, 77.12150],
            [13.31350, 77.12110],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31370, 77.12110]]
    },
    {
        id: 'civil-block',
        name: 'CIVIL BLOCK',
        code: 'CIVIL',
        type: 'academic',
        description: 'Civil Engineering Department',
        center: [13.31335, 77.12130],
        polygon: [
            [13.31355, 77.12110],
            [13.31355, 77.12150],
            [13.31315, 77.12150],
            [13.31315, 77.12110],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31335, 77.12110]]
    },
    {
        id: 'mech-block',
        name: 'MECH BLOCK',
        code: 'MECH',
        type: 'academic',
        description: 'Mechanical Engineering Department',
        center: [13.31300, 77.12130],
        polygon: [
            [13.31320, 77.12110],
            [13.31320, 77.12150],
            [13.31280, 77.12150],
            [13.31280, 77.12110],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31300, 77.12110]]
    },
    {
        id: 'parking-area',
        name: 'PARKING LOT',
        code: 'PARK',
        type: 'parking',
        description: 'Main Parking Area',
        center: [13.31180, 77.12130],
        polygon: [
            [13.31220, 77.12090],
            [13.31220, 77.12170],
            [13.31140, 77.12170],
            [13.31140, 77.12090],
        ],
        floors: [1],
        color: '#808080',
        height: 0.5,
        entrances: [[13.31180, 77.12090]]
    },
    {
        id: 'ece-block',
        name: 'ECE BLOCK',
        code: 'ECE',
        type: 'academic',
        description: 'Electronics and Communication Engineering Department',
        center: [13.31265, 77.12130],
        polygon: [
            [13.31285, 77.12110],
            [13.31285, 77.12150],
            [13.31245, 77.12150],
            [13.31245, 77.12110],
        ],
        floors: [1, 2, 3],
        color: '#d4a574',
        height: 12,
        entrances: [[13.31265, 77.12110]]
    },
];

// Navigation graph - walkable paths between points
export const navigationGraph = {
    nodes: [
        // Main entrance area
        { id: 'n1', name: 'Main Gate', lat: 13.31150, lng: 77.12130 },
        { id: 'n2', name: 'Entrance Junction', lat: 13.31200, lng: 77.12130 },

        // Central pathway (horizontal)
        { id: 'n3', name: 'Admin Junction', lat: 13.31215, lng: 77.12130 },
        { id: 'n4', name: 'Stage Junction', lat: 13.31240, lng: 77.12130 },
        { id: 'n5', name: 'Library Junction', lat: 13.31250, lng: 77.12080 },
        { id: 'n6', name: 'ECE Junction', lat: 13.31265, lng: 77.12130 },
        { id: 'n7', name: 'Mech Junction', lat: 13.31300, lng: 77.12130 },
        { id: 'n8', name: 'Civil Junction', lat: 13.31335, lng: 77.12130 },
        { id: 'n9', name: 'EEE Junction', lat: 13.31370, lng: 77.12130 },

        // Hostel area
        { id: 'n10', name: 'Hostel Junction', lat: 13.31285, lng: 77.12080 },
        { id: 'n11', name: 'Girls Hostel Junction', lat: 13.31325, lng: 77.12080 },

        // Parking area
        { id: 'n12', name: 'Parking Entrance', lat: 13.31180, lng: 77.12090 },

        // Building entrances
        { id: 'e_admin', name: 'Admin Entrance', lat: 13.31215, lng: 77.12110 },
        { id: 'e_stage', name: 'Stage Entrance', lat: 13.31240, lng: 77.12115 },
        { id: 'e_library', name: 'Library Entrance', lat: 13.31250, lng: 77.12095 },
        { id: 'e_ece', name: 'ECE Entrance', lat: 13.31265, lng: 77.12110 },
        { id: 'e_mech', name: 'Mech Entrance', lat: 13.31300, lng: 77.12110 },
        { id: 'e_civil', name: 'Civil Entrance', lat: 13.31335, lng: 77.12110 },
        { id: 'e_eee', name: 'EEE Entrance', lat: 13.31370, lng: 77.12110 },
        { id: 'e_hostel', name: 'Hostel Entrance', lat: 13.31285, lng: 77.12075 },
        { id: 'e_girls_hostel', name: 'Girls Hostel Entrance', lat: 13.31325, lng: 77.12075 },
    ],
    edges: [
        // Main path connections
        { from: 'n1', to: 'n2', distance: 50 },
        { from: 'n2', to: 'n3', distance: 20 },
        { from: 'n3', to: 'n4', distance: 30 },
        { from: 'n4', to: 'n6', distance: 30 },
        { from: 'n6', to: 'n7', distance: 40 },
        { from: 'n7', to: 'n8', distance: 40 },
        { from: 'n8', to: 'n9', distance: 40 },

        // Cross connections
        { from: 'n5', to: 'n4', distance: 30 },
        { from: 'n5', to: 'n10', distance: 20 },
        { from: 'n10', to: 'n11', distance: 40 },
        { from: 'n11', to: 'n8', distance: 30 },

        // Parking connections
        { from: 'n2', to: 'n12', distance: 25 },

        // Building entrance connections
        { from: 'n3', to: 'e_admin', distance: 15 },
        { from: 'n4', to: 'e_stage', distance: 15 },
        { from: 'n5', to: 'e_library', distance: 15 },
        { from: 'n6', to: 'e_ece', distance: 15 },
        { from: 'n7', to: 'e_mech', distance: 15 },
        { from: 'n8', to: 'e_civil', distance: 15 },
        { from: 'n9', to: 'e_eee', distance: 15 },
        { from: 'n10', to: 'e_hostel', distance: 15 },
        { from: 'n11', to: 'e_girls_hostel', distance: 15 },
    ]
};

// Map all building IDs to their nearest navigation nodes
export const buildingToNodeMap = {
    'admin': 'e_admin',
    'main-stage': 'e_stage',
    'library': 'e_library',
    'ece-block': 'e_ece',
    'mech-block': 'e_mech',
    'civil-block': 'e_civil',
    'eee-block': 'e_eee',
    'hostel': 'e_hostel',
    'girls-hostel': 'e_girls_hostel',
    'parking-area': 'n12',
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
