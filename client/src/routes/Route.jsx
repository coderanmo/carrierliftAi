// src/routes/AppRoutes.jsx
import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/home/Home";
import Login from "../common/Login";
import Register from "../common/Register";
import ProtectedRoute from "./ProtectedRoute";
import UserDashboard from "../pages/dashboard/UserDashboard";
import Chatbot from "../pages/home/Chatboat";

const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            { path: "/", element: <Home /> },
            { path: '/chatbot', element: <Chatbot /> }
        ],
    },
    {
        element: <PrivateRoute />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            { path: "/dashboard", element: <UserDashboard /> },
        ],
    },
]);

export default router;
