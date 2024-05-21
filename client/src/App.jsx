import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Home from "./pages/dashboard/Home";
import Suppliers from "./pages/suppliers/Suppliers";
import AddSupplier from "./pages/suppliers/AddSupplier";
import Farms from "./pages/farms/Farms";
import NotFound from "./pages/NotFound";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplier/suppliers/"
          element={
            <ProtectedRoute>
              <Suppliers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/add-supplier/"
          element={
            <ProtectedRoute>
              <AddSupplier />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farm/farms/"
          element={
            <ProtectedRoute>
              <Farms />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
