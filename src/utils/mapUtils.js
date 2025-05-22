// src/utils/mapUtils.js
// ======================
// Utility functions for map data processing

export const getTripEndpoints = (trip) => {
    try {
        if (!trip?.path?.length) {
            return [];
        }
        return [
            {
                coordinates: trip.path[0],
                type: 'start',
                tripName: trip.name,
                color: trip.color
            },
            {
                coordinates: trip.path[trip.path.length - 1],
                type: 'end',
                tripName: trip.name,
                color: trip.color
            }
        ];
    } catch (error) {
        console.error('Error processing trip endpoints for trip:', trip, error);
        return [];
    }
};

// Helper to generate a random color for new trips
export const getRandomColor = () => {
    return [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256)
    ];
};

// Helper to prepare data for ArcLayer (start and end of each trip)
export const prepareArcData = (trips) => {
    return trips.map(trip => {
        if (!trip.path || trip.path.length < 2) {
            // Not enough points for an arc, or invalid path
            return null;
        }
        return {
            id: trip.id,
            name: trip.name,
            sourcePosition: trip.path[0],
            targetPosition: trip.path[trip.path.length - 1],
            color: trip.color,
            // You can add other properties here if needed by the ArcLayer, like custom height
        };
    }).filter(Boolean); // Remove null entries for invalid trips
};