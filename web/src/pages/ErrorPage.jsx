import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center p-4 sm:p-6">
        <h1 className="text-4xl sm:text-6xl font-bold text-red-600 mb-2 sm:mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-6 sm:mb-8">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:space-x-4">
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium py-2 px-6 rounded-lg transition-colors w-full sm:w-auto"
          >
            Volver al inicio
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors mt-3 sm:mt-0 w-full sm:w-auto"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
