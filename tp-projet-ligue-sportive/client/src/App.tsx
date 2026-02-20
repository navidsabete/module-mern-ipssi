import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes";

import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Location from "./pages/adherent/Location";
import Dashboard from "./pages/admin/Dashboard";
import AdherentManagement from "./pages/admin/AdherentManagement";
import ProductManagement from "./pages/admin/ProductManagement";

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
            <ProtectedRoute allowedRoles={["adherent", "admin"]}>
              <Location />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

         <Route
        path="/admin/produits"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ProductManagement />
          </ProtectedRoute>
        }
        />
     

        <Route
        path="/admin/adherents"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdherentManagement />
          </ProtectedRoute>
        }
        />
      </Routes>
    </div>
  );
}

export default App;
