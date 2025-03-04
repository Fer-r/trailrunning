import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
// import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
