import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_URL_API;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useAuth();
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Bienvenido de nuevo
          </h2>
          <p className="text-lg text-gray-600">
            Inicia sesión para acceder a tu cuenta
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700 mb-2"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 text-base"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 text-base"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Remember me & Forgot password
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-base text-gray-900"
              >
                Recordarme
              </label>
            </div>

          </div> */}
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative  cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#8EB486] hover:bg-[#7a9c72] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8EB486] transition-colors duration-200"
            >
              Iniciar Sesión
            </button>
          </div>
          {/* Sign up link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">¿No tienes una cuenta? </span>
            <a
              href={`${apiUrl}/register`}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
