// Note: Entry point for react
import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot: creates a root for React to render into
import App from './App';

// Renders the App component into the DOM element with id "root"
const root = createRoot(document.getElementById('root'));
root.render(
 // <React.StrictMode>
    <App />
 //  </React.StrictMode>
);

