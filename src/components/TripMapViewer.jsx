// src/components/TripMapViewer.jsx
// ================================
import React, { useState, useCallback, useEffect, useMemo } from 'react'; // Added useMemo
import DeckGL from '@deck.gl/react';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers'; // Changed PathLayer to ArcLayer
import { Map } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { MAPBOX_ACCESS_TOKEN, MAP_STYLE, INITIAL_VIEW_STATE } from '../config/mapConfig';
import { initialTripsData } from '../data/tripData';
import { getTripEndpoints, getRandomColor, prepareArcData } from '../utils/mapUtils'; // Added prepareArcData

import Tooltip from './Tooltip';
import Legend from './Legend';
import MapStatusMessages from './MapStatusMessages';
import AddTripModal from './AddTripModal';

const TripMapViewer = () => {
    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
    const [hoverInfo, setHoverInfo] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(null);
    const [trips, setTrips] = useState(initialTripsData);
    const [showAddTripModal, setShowAddTripModal] = useState(false);

    useEffect(() => {
        console.log('TripMapViewer mounted.');
        if (!MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN === 'YOUR_MAPBOX_ACCESS_TOKEN_HERE') {
            console.warn("Mapbox Access Token is missing or is a placeholder. Map may not load correctly.");
        }
    }, []);

    const onViewStateChange = useCallback(({ viewState: newViewState }) => {
        setViewState(newViewState);
    }, []);

    const onMapLoad = useCallback(() => {
        console.log('Mapbox map has loaded successfully.');
        setMapLoaded(true);
        setMapError(null);
    }, []);

    const onMapError = useCallback((e) => {
        console.error('Mapbox map error:', e.error || e);
        setMapError(e.error || { message: 'Unknown map error' });
        setMapLoaded(true);
    }, []);

    const handleAddTrip = (name, path) => {
        const newTrip = {
            id: `trip-${Date.now()}`,
            name,
            path, // Keep the full path for potential future use or if ScatterplotLayer needs it
            color: getRandomColor(),
        };
        setTrips(currentTrips => [...currentTrips, newTrip]);
    };

    // Prepare data for ArcLayer, memoized for performance
    const arcData = useMemo(() => prepareArcData(trips), [trips]);

    const layers = [
        new ArcLayer({
            id: 'arc-layer',
            data: arcData, // Use prepared arc data
            getSourcePosition: d => d.sourcePosition,
            getTargetPosition: d => d.targetPosition,
            getSourceColor: d => d.color,
            getTargetColor: d => d.color,
            getHeight: 0.5, // Adjust for desired arc height (can be a value or a function)
                            // For example, getHeight: d => Math.sqrt(d.distance) * 0.1 if you calculate distance
            getStrokeWidth: 8, // Renamed from getWidth for newer deck.gl, or use getWidth if on older version
            widthMinPixels: 2,
            widthMaxPixels: 15,
            pickable: true,
            onHover: setHoverInfo,
            autoHighlight: true,
            highlightColor: [255, 255, 0, 200],
        }),
        new ScatterplotLayer({
            id: 'endpoints-layer',
            data: trips.flatMap(getTripEndpoints),
            getPosition: d => d.coordinates,
            getFillColor: d => d.color,
            getRadius: 500,
            radiusMinPixels: 8,
            radiusMaxPixels: 12,
            pickable: true,
            onHover: setHoverInfo,
            autoHighlight: true,
        })
    ];

    const isTokenMissing = !MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN === 'YOUR_MAPBOX_ACCESS_TOKEN_HERE';

    return (
        <div className="map-viewer-container">
            <DeckGL
                layers={layers}
                initialViewState={viewState}
                onViewStateChange={onViewStateChange}
                controller={true}
                getTooltip={info => info}
                style={{ position: 'relative', width: '100%', height: '100%' }}
            >
                {!isTokenMissing ? (
                    <Map
                        reuseMaps
                        mapStyle={MAP_STYLE}
                        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                        onLoad={onMapLoad}
                        onError={onMapError}
                        preventStyleDiffing={true}
                    />
                ) : (
                    <div style={{width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {/* Message is handled by MapStatusMessages */}
                    </div>
                )}
                <Tooltip hoverInfo={hoverInfo} />
            </DeckGL>

            <Legend trips={trips} />
            <MapStatusMessages mapLoaded={mapLoaded} mapError={mapError} isTokenMissing={isTokenMissing} />

            <button
                className="add-trip-button"
                onClick={() => setShowAddTripModal(true)}
                title="Add New Trip"
            >
                +
            </button>

            <AddTripModal
                isOpen={showAddTripModal}
                onClose={() => setShowAddTripModal(false)}
                onAddTrip={handleAddTrip}
            />
        </div>
    );
};

export default TripMapViewer;
