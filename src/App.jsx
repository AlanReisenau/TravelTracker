// src/App.jsx
// ===========
// Main application component

import React from 'react';
import TripMapViewer from './components/TripMapViewer';
import './styles/main.css'; // Import global styles

function App() {
    return (
        <div className="app-container">
            <TripMapViewer />
        </div>
    );
}

export default App;