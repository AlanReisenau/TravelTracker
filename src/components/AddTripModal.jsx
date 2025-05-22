// src/components/AddTripModal.jsx
// ===============================
// New component for adding a trip
import React, { useState } from 'react';

const AddTripModal = ({ isOpen, onClose, onAddTrip }) => {
    const [tripName, setTripName] = useState('');
    const [tripPath, setTripPath] = useState(''); // Expects string like "[[lon,lat],[lon,lat]]"
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!tripName.trim()) {
            setError('Trip name is required.');
            return;
        }
        try {
            const parsedPath = JSON.parse(tripPath);
            if (!Array.isArray(parsedPath) || !parsedPath.every(p => Array.isArray(p) && p.length === 2 && typeof p[0] === 'number' && typeof p[1] === 'number')) {
                throw new Error('Invalid path format. Expected array of [longitude, latitude] pairs.');
            }
            onAddTrip(tripName, parsedPath);
            setTripName('');
            setTripPath('');
            onClose();
        } catch (err) {
            console.error("Error parsing trip path:", err);
            setError(err.message || 'Invalid path format. Please use JSON array of [lon, lat] coordinates, e.g., [[-122, 37],[-121,36]].');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Trip</h2>
                {error && <p className="modal-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="tripName">Trip Name:</label>
                        <input
                            type="text"
                            id="tripName"
                            value={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tripPath">Trip Path (JSON array of [lon, lat]):</label>
                        <textarea
                            id="tripPath"
                            value={tripPath}
                            onChange={(e) => setTripPath(e.target.value)}
                            rows="5"
                            placeholder="e.g., [[-122.4, 37.7], [-122.5, 37.8]]"
                            required
                        />
                        <small>Example: <code>[[-73.98, 40.75], [-73.99, 40.76]]</code></small>
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="button-primary">Add Trip</button>
                        <button type="button" onClick={onClose} className="button-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTripModal;
