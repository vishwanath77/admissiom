import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ApplicantPage from "./pages/ApplicantPage";
import AllocationPage from "./pages/AllocationPage";
import MasterPage from "./pages/MasterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  if (!isAuth) {
    return <Login setIsAuth={setIsAuth} />;
  }

  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar setIsAuth={setIsAuth} />

      <div className="container">
        {/* ADMIN */}
        <ProtectedRoute allowedRoles={["admin"]}>
          <MasterPage />
        </ProtectedRoute>

        {/* OFFICER */}
        <ProtectedRoute allowedRoles={["officer"]}>
          <>
            <ApplicantPage />
            <AllocationPage />
          </>
        </ProtectedRoute>

        {/* MANAGEMENT */}
        <ProtectedRoute allowedRoles={["management"]}>
          <Dashboard />
        </ProtectedRoute>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}
