import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import {
  getParticipants,
  getTrailRunningDetails,
} from "../services/useServices";

const RaceDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const {
    data: race,
    error,
    loading,
  } = useFetch(() => getTrailRunningDetails(id), [id]);
  const {
    data: participants,
    error: participantsError,
    loading: loadingParticipants,
  } = useFetch(() => getParticipants(id), [id]);
  const handleRegistration = () => {
    setIsRegistered(!isRegistered);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-slate-600">Cargando...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Imagen de la carrera */}
        <div className="relative h-48 sm:h-64 w-full">
          <img
            src={race?.image}
            alt={race?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-white px-4 text-center">
              {race?.name}
            </h1>
          </div>
        </div>

        {/* Información principal */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Detalles de la Carrera
              </h2>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Fecha:</span>{" "}
                  {race?.release_date
                    ? new Date(race.release_date).toLocaleDateString()
                    : "No disponible"}
                </p>
                <p>
                  <span className="font-semibold">Distancia:</span>{" "}
                  {race?.distance_km} km
                </p>
                <p>
                  <span className="font-semibold">Ubicación:</span>{" "}
                  {race?.location}
                </p>
                <p>
                  <span className="font-semibold">Desnivel:</span>{" "}
                  {race?.unevenness}m
                </p>
                <p>
                  <span className="font-semibold">Categoría:</span>{" "}
                  {race?.category}
                </p>
                <p>
                  <span className="font-semibold">Estado:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded ${
                      race?.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : race?.status === "Closed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {race?.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Inscripción
              </h2>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Precio:</span>{" "}
                  {race?.entry_fee}€
                </p>
                <p>
                  <span className="font-semibold">Plazas disponibles:</span>{" "}
                  {race?.available_slots}
                </p>

                {isAuthenticated &&
                race?.status === "Open" &&
                race?.available_slots > 0 ? (
                  <button
                    className="w-full mt-4 bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary-700 active:bg-primary-800 transition duration-200"
                    onClick={handleRegistration}
                  >
                    Inscribirse
                  </button>
                ) : (
                  <p className="text-red-600 mt-4">
                    {!isAuthenticated
                      ? "Debes iniciar sesión para inscribirte"
                      : race?.available_slots <= 0
                      ? "No hay plazas disponibles"
                      : "Las inscripciones están cerradas"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold m  b-4">
              Descripción
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {race?.description}
            </p>
          </div>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
              Participantes
            </h2>
            {loadingParticipants ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Cargando participantes...</p>
              </div>
            ) : participantsError ? (
              <div className="text-center py-4">
                <p className="text-red-600">Error: {participantsError}</p>
              </div>
            ) : participants?.length > 0 ? (
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <span className="text-sky-600 font-semibold">
                          {participant.name?.[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {participant.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {participant.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      #{participant.dorsal || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">
                  Aún no hay participantes, ¡Sé el primero!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceDetail;
