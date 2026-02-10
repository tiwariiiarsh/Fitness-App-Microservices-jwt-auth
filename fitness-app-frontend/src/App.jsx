import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";
import ActivityPage from "./pages/ActivityPage";
import ActivityDetail from "./components/ActivityDetails";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* LIST PAGE */}
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivityPage />
            </ProtectedRoute>
          }
        />

        {/* 🔥 DETAIL PAGE (THIS WAS MISSING) */}
        <Route
          path="/activities/:id"
          element={
            <ProtectedRoute>
              <ActivityDetail />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
