// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import DashboardLayout from "../layout/DashboardLayout";

const ProtectedRoute = () => {
    return isAuthenticated() ? <DashboardLayout /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;  