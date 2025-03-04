import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import raceData from "../example.json";

const RaceDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  
  const race = raceData.races.find(race => race.id === parseInt(id));

  if (!race) {
    return <div className="text-center p-8">No se encontró la carrera</div>;
  }

  const handleRegistration = () => {
    // Registration logic will be implemented later
    console.log("Registering for race:", race.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 w-full">
          <img
            src={race.img || "https://via.placeholder.com/800x400"}
            alt={race.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{race.name}</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Detalles de la Carrera</h2>
              <div className="space-y-3">
                <p><span className="font-semibold">Fecha:</span> {new Date(race.release_date).toLocaleDateString()}</p>
                <p><span className="font-semibold">Distancia:</span> {race.distance_km} km</p>
                <p><span className="font-semibold">Ubicación:</span> {race.location}</p>
                <p><span className="font-semibold">Desnivel:</span> {race.unevenness}m</p>
                <p><span className="font-semibold">Categoría:</span> {race.category}</p>
                <p><span className="font-semibold">Estado:</span> 
                  <span className={`ml-2 px-2 py-1 rounded ${
                    race.status === 'Open' ? 'bg-green-100 text-green-800' :
                    race.status === 'Closed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {race.status}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Inscripción</h2>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Precio:</span>{" "}
                  {race.entry_fee}€
                </p>
                <p>
                  <span className="font-semibold">Plazas disponibles:</span>{" "}
                  {race.available_slots}
                </p>

                {!isAuthenticated &&
                race.status === "Open" &&
                race.available_slots > 0 ? (
                  <button
                    className="w-full mt-4 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-200"
                    onClick={() => handleRegistration()}
                  >
                    Inscribirse
                  </button>
                ) : (
                  <p className="text-red-600">
                    {!isAuthenticated
                      ? "Debes iniciar sesión para inscribirte"
                      : race.available_slots <= 0
                      ? "No hay plazas disponibles"
                      : "Las inscripciones están cerradas"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {race.description}
            </p>
          </div>

          {/* Mapa */}
          {race.coordinates && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Ubicación</h2>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <iframe
                  title="Race Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${race.coordinates}&zoom=13`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceDetail;
