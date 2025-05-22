// src/components/MapStatusMessages.jsx
// ====================================
// Component for displaying map loading and error messages

import React from 'react';

const MapStatusMessages = ({ mapLoaded, mapError, isTokenMissing }) => {
    if (isTokenMissing) {
        return (
            <div className="map-error-message critical">
                Missing Mapbox token - please configure your access token in src/config/mapConfig.js
            </div>
        );
    }

    if (mapError) {
        return (
            <div className="map-error-message">
                Map error: {mapError.message || mapError.toString()}
            </div>
        );
    }

    if (!mapLoaded) {
        return (
            <div className="map-loading-message">
                Loading map...
            </div>
        );
    }

    return null; // No message to display
};

export default MapStatusMessages;
