import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {


  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
