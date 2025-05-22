// src/main.jsx (Ensure this file imports your App and main.css)
// =============================================================
// This is Vite's main entry point.
// Make sure it imports your new App component and the CSS file.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// If you created src/styles/main.css and want to use it globally:
import './styles/main.css'
// Or if your main CSS is index.css as per default Vite:
// import './index.css'

ReactDOM.createRoot(document.getElementById('app')).render( // Ensure this matches your index.html
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)