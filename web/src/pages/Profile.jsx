import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-green-400 to-blue-500">
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl">
              <img
                src={
                  user?.image ||
                  (user.gender ? "/photo-male.jpg" : "/photo-female.jpg")
                }
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/128";
                }}
              />
            </div>
          </div>
        </div>

        {/* Informacion de Perfil */}
        <div className="mt-20 px-6 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
              <p className="text-gray-600 mt-1">{user?.email}</p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Género:</span>{" "}
                  {user?.gender === "M" ? "Hombre" : "Mujer"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Edad:</span>{" "}
                  {user?.age ? `${user.age} años` : "No especificado"}
                </p>
              </div>
            </div>
            <button
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-md"
              onClick={() => navigate("/profile/edit")}
            >
              Editar Perfil
            </button>
          </div>

          {/* Seccion carreras */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Mis Carreras
            </h2>
            {!user?.trailRunningParticipants ||
            user.trailRunningParticipants.filter((p) => !p.banned).length ===
              0 ? (
              <p className="text-gray-600 text-center py-8 bg-gray-50 rounded-lg">
                No estás registrado en ninguna carrera.
              </p>
            ) : (
              <div className="space-y-4">
                {user.trailRunningParticipants
                  .filter((participation) => !participation.banned)
                  .map((participation) => (
                    <div
                      key={participation.id}
                      className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {participation.trailRunning.name}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">Fecha</p>
                          <p className="font-medium text-gray-800">
                            {new Date(
                              participation.trailRunning.date
                            ).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Dorsal</p>
                          <p className="font-medium text-gray-800">
                            {participation.dorsal}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Tiempo</p>
                          <p className="font-medium text-gray-800">
                            {participation.time || "No disponible"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Estado</p>
                          <p
                            className={`font-medium ${
                              participation.banned
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {participation.banned ? "Baneado" : "Activo"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
