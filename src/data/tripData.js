// src/data/tripData.js
// =====================
// Sample initial trip data. This will be used as the initial state.

export const initialTripsData = [ // Renamed to avoid confusion when used as initial state
    {
        id: 'trip-sf-to-la',
        name: 'Road Trip: SF to LA',
        color: [255, 77, 77],
        path: [
            [-122.4194, 37.7749], [-122.2711, 37.8044], [-121.8853, 37.3382],
            [-118.6926, 34.0207], [-118.2437, 34.0522],
        ],
    },
    {
        id: 'trip-nyc-loop',
        name: 'NYC Adventure Loop',
        color: [77, 166, 255],
        path: [
            [-74.0060, 40.7128], [-73.9851, 40.7580], [-73.9654, 40.7829],
            [-73.9712, 40.7831], [-73.9496, 40.7967], [-73.9971, 40.7306],
            [-74.0060, 40.7128],
        ],
    },
    {
        id: 'short-hike',
        name: 'Mountain View Trail',
        color: [77, 200, 77],
        path: [
            [-119.5383, 37.8651], [-119.5400, 37.8660], [-119.5425, 37.8675],
            [-119.5450, 37.8690], [-119.5470, 37.8700], [-119.5485, 37.8715]
        ]
    }
];