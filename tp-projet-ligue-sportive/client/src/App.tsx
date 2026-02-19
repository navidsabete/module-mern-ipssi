import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes";

import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Location from "./pages/adherent/Location";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />

        <Route
          path="/adherent/location"
          element={
            <ProtectedRoute allowedRoles={["ADHERENT", "ADMIN"]}>
              <Location />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
