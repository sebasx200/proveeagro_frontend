import PageTitle from "./components/pageTitle";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Home from "./pages/dashboard/Home";
import Agenda from "./pages/dashboard/Agenda";
import Suppliers from "./pages/suppliers/Suppliers";
import AddSupplier from "./pages/suppliers/AddSupplier";
import EditSupplier from "./pages/suppliers/EditSupplier";
import Farms from "./pages/farms/Farms";
import AddFarm from "./pages/farms/AddFarm";
import EditFarm from "./pages/farms/EditFarm";
import Locations from "./pages/dashboard/Locations";
import UserProfile from "./pages/dashboard/UserProfile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import { UserProvider } from "./components/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import useUser from "./hooks/useUser";
import PropTypes from "prop-types";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function CurrentUser({ children }) {
  const { user } = useUser();
  return children;
}

CurrentUser.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <PageTitle title="Inicio" />
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute>
                  <PageTitle title="Perfil" />
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agenda"
              element={
                <ProtectedRoute>
                  <PageTitle title="Agenda" />
                  <Agenda />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supplier/suppliers/"
              element={
                <CurrentUser>
                  <PageTitle title="Proveedores" />
                  <Suppliers />
                </CurrentUser>
              }
            />
            <Route
              path="/supplier/add-supplier/"
              element={
                <ProtectedRoute>
                  <PageTitle title="Añadir proveedor" />
                  <AddSupplier />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supplier/suppliers/:id/"
              element={
                <ProtectedRoute>
                  <PageTitle title="Proveedor" />
                  <EditSupplier />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm/farms/"
              element={
                <ProtectedRoute>
                  <PageTitle title="Granjas" />
                  <Farms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm/add-farm/"
              element={
                <ProtectedRoute>
                  <PageTitle title="Añadir granja" />
                  <AddFarm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm/farms/:id/"
              element={
                <ProtectedRoute>
                  <PageTitle title="Granja" />
                  <EditFarm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/locations/"
              element={
                <ProtectedRoute>
                  <PageTitle title="Ubicaciones" />
                  <Locations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <PageTitle title={"Inicio de sesión"} />
                  <Login />
                </>
              }
            />
            <Route
              path="/logout"
              element={
                <>
                  <PageTitle title={"Cerrar sesión"} />
                  <Logout />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <PageTitle title={"Registro"} />
                  <RegisterAndLogout />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <PageTitle title={"Página no encontrada"} />
                  <NotFound />
                </>
              }
            ></Route>
          </Routes>
          <Toaster />
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
