// src/components/Legend.jsx
// =========================
// Component for rendering the map legend

import React from 'react';

const Legend = ({ trips }) => {
    return (
        <div className="map-legend">
            <h3>Trip Legend</h3>
            <div className="legend-items">
                {trips.map(trip => (
                    <div key={trip.id} className="legend-item">
            <span
                className="legend-color"
                style={{ backgroundColor: `rgb(${trip.color.join(',')})` }}
            />
                        <span className="legend-label">{trip.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Legend;