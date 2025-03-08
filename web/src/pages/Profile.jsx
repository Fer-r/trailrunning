import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_URL_API;

const Profile = () => {
  const { user, token } = useAuth();
  const [participant, setParticipant] = useState(null);
  const [races, setRaces] = useState([]);
  const [participantRaces, setParticipantRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchParticipantData = async () => {
  //     if (!user) return;
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`${API_URL}/participants/${user.id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       if (!response.ok) throw new Error("Error al cargar los datos del participante");
  //       const data = await response.json();
  //       setParticipant(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const fetchRaces = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/races`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       if (!response.ok) throw new Error("Error al cargar las carreras");
  //       const data = await response.json();
  //       setRaces(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchParticipantData();
  //   fetchRaces();
  // }, [user, token]);

  useEffect(() => {
    if (participant && races.length > 0) {
      const filteredRaces = races.filter(
        (race) => participant.trail_running_id === race.id
      );
      setParticipantRaces(
        filteredRaces.map((race) => ({
          ...race,
          dorsal: participant.dorsal,
          time: participant.time,
          banned: participant.banned,
        }))
      );
    }
  }, [participant, races]);

  // if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header with Background */}
        <div className="relative h-48 bg-gradient-to-r from-green-400 to-blue-500">
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl">
              <img
                src={user?.image || "https://via.placeholder.com/128"}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/128";
                }}
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-20 px-6 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
              <p className="text-gray-600 mt-1">{user?.email}</p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Género:</span> {user?.gender}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Edad:</span>{" "}
                  {user?.birthDate
                    ? calculateAge(user.birthDate)
                    : "No especificado"}
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

          {/* Participant Info Card */}
          {participant && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Información de Participante
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm">Categoría</p>
                  <p className="font-medium text-gray-800">
                    {participant.category}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm">Club</p>
                  <p className="font-medium text-gray-800">
                    {participant.club}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm">Número de Federación</p>
                  <p className="font-medium text-gray-800">
                    {participant.federationNumber}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Races Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Mis Carreras
            </h2>
            {participantRaces.length === 0 ? (
              <p className="text-gray-600 text-center py-8 bg-gray-50 rounded-lg">
                No estás registrado en ninguna carrera.
              </p>
            ) : (
              <div className="space-y-4">
                {participantRaces.map((race) => (
                  <div
                    key={race.id}
                    className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {race.name}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Fecha</p>
                        <p className="font-medium text-gray-800">{race.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Dorsal</p>
                        <p className="font-medium text-gray-800">
                          {race.dorsal}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Tiempo</p>
                        <p className="font-medium text-gray-800">
                          {race.time || "No disponible"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Estado</p>
                        <p
                          className={`font-medium ${
                            race.banned ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {race.banned ? "Baneado" : "Activo"}
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
