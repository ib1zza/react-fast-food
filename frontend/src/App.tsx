import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <CartDrawer />
      </div>
    </Router>
  );
};

export default App;
