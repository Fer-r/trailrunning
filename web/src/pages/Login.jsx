import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const nombre = e.target.name;
    setFormData({ ...formData, [nombre]: e.target.value.trim() });
  };

  // Realizar un petición a la api con los datos del formulario para verificar
  // si el usuario existe en la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // aquí hacemos un login.
      await login(formData);
      // redirigir a la página Home si hay éxito
      navigate("/");
    } catch (error) {
      console.log("Error al iniciar sesión", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 sm:my-10 p-4 sm:p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
        INICIAR SESIÓN
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-lg sm:text-xl font-semibold text-gray-900"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2 mt-2 text-base sm:text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            autoComplete="email"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-lg sm:text-xl font-semibold text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2 mt-2 text-base sm:text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 text-base sm:text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
