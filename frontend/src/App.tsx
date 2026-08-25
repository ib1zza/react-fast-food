import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { TestPage } from "./pages/TestPage";
import { useUser } from "./data/useUser";

export const App: React.FC = () => {
  const { user } = useUser();

  console.log(user);
  return (
    <div>
      {user && <div>user: {user.email}</div>}
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
