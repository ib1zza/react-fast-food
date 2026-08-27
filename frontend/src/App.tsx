import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import { TestPage } from "./pages/TestPage";
import { HeaderlessLayout } from "./components/layout/HeaderlessLayout";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="test" element={<TestPage />} />
        </Route>
        <Route path="/user" element={<HeaderlessLayout />}>
          <Route path="test" element={<TestPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
