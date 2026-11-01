import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';

// To add a page: add a <Route> here AND its path to reactSnap.include in
// package.json. That list drives both the static pre-render and the sitemap.
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
