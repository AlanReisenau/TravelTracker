// src/config/mapConfig.js
// ========================
// Map-related configurations

// IMPORTANT: Replace 'YOUR_MAPBOX_ACCESS_TOKEN_HERE' with your actual Mapbox Access Token
export const MAPBOX_ACCESS_TOKEN = 'YOUR_TOKEN_HERE';

export const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';
// Alternative token-free style from user's code:
// export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

// Initial view state for the map
export const INITIAL_VIEW_STATE = {
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 10,
    pitch: 45, // Pitch is important for seeing 3D arcs
    bearing: 0,
};