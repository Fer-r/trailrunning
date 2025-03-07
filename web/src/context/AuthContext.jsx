import { createContext, useContext, useState } from "react";

const API_URL = import.meta.env.VITE_URL_API;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    try {
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
      setIsAuthenticated(true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.log("Error al iniciar sesión", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
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
