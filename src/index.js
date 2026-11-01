import React, { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// If the page was pre-rendered by react-snap, hydrate instead of render
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
