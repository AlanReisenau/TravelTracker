// src/components/Tooltip.jsx
// ==========================
import React from 'react';

const Tooltip = ({ hoverInfo }) => {
    if (!hoverInfo?.object) return null;

    const { object, layer, coordinate } = hoverInfo;
    // Adjust for ArcLayer data structure if needed
    const isArc = layer.id === 'arc-layer';
    const isEndpoint = layer.id === 'endpoints-layer';

    let name = object.name;
    let type = '';

    if (isArc) {
        type = 'Trip Arc';
    } else if (isEndpoint) {
        name = object.tripName;
        type = object.type === 'start' ? 'Start Point' : 'End Point';
    }


    return (
        <div className="tooltip" style={{
            position: 'absolute',
            left: hoverInfo.x ? hoverInfo.x + 10 : 0,
            top: hoverInfo.y ? hoverInfo.y + 10 : 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 12px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 1000,
            pointerEvents: 'none'
        }}>
            <div className="tooltip-header" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {type}
            </div>
            <div className="tooltip-content" style={{ marginBottom: '2px' }}>
                {name}
            </div>
            {/* Coordinate might not be directly relevant for an arc hover, but useful for endpoints */}
            {coordinate && isEndpoint && (
                <div className="tooltip-coords" style={{ fontSize: '0.8em', color: '#555' }}>
                    Lng: {coordinate[0].toFixed(4)}, Lat: {coordinate[1].toFixed(4)}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
