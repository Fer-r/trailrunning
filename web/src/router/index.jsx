import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import LoginPage from "../pages/Login";

const isAuthenticated = () => {
  // leer del localstorage si existe un token
  return localStorage.getItem("token") !== null;
};
const ProtectedRoute = ({ children }) => {
  // const navigate = useNavigate();
  // Debe impedir el acceos al profile a no ser que tenga un token
  // guardado en localstorage
  // if (!isAuthenticated()) {
  //   navigate("/");
  //   return null;
  // }

  if (!isAuthenticated()) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

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
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
