import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { useUser } from "./data/useUser";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import { TestPage } from "./pages/TestPage";
import { HeaderlessLayout } from "./components/layout/HeaderlessLayout";
import { AuthModal } from "./components/auth/AuthModal/AuthModal";
import { useModalStore } from "./store/useModalStore";

export const App: React.FC = () => {
  const { user } = useUser();

  console.log(user);

  const { modalOpened, setModalOpened } = useModalStore();

  const closeAuth = () => {
    setModalOpened(null);
  };

  return (
    <div>
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

      <AuthModal
        isOpen={!!modalOpened}
        onClose={closeAuth}
        mode={modalOpened}
        onSwitchMode={setModalOpened}
      />
    </div>
  );
};

export default App;
