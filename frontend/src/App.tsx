import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';

export const App: React.FC = () => {

  
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
