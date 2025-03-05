import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
// import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";
import LoginPage from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import RaceDetail from "../pages/RaceDetail";
import ErrorPage from "../pages/errorpage";
import RootLayout from "../layout/rootlayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "trailrunning/:id",
        element: <RaceDetail />,
      },
    ],
  },
]);
