import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
const API_URL = import.meta.env.VITE_URL_API;
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = () => {
    if (token && user) {
      try {
        const decodedToken = jwtDecode(token);
        const currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          logOut(); // Automatically logout if token is expired
          return false;
        }
        return true;
      } catch (error) {
        logOut(); // Invalid token
        return false;
      }
    }
    return false;
  };

  const login = async ({ email, password }) => {
    setError(null);
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api2/auth/login_check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }
      // Si estoy aquí es porque el usuario se ha logueado correctamente
      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.log("Error al iniciar sesión", error);
      setError(error.message);
      throw error; // Re-throw to handle in the component
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logOut, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};
