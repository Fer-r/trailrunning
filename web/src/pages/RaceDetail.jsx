import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import {
  getParticipants,
  getTrailRunningDetails,
} from "../services/useServices";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import defaultTrailImage from "../assets/default-trail.jpg";
import { CiCalendar } from "react-icons/ci";
import { GiLevelEndFlag, GiPathDistance } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
const RaceDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showMap, setShowMap] = useState(false);
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
  const coordinates = race?.coordinates
    ?.split(",")
    .map((coord) => parseFloat(coord)) || [0, 0];
  const [lat, lng] = coordinates;
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Imagen de la carrera */}
        <div className="relative h-64 sm:h-96 w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-1"></div>
          <img
            src={race?.img || defaultTrailImage}
            alt={race?.name}
            className="w-full h-full object-cover blur-sm"
            onError={(e) => {
              e.target.src = defaultTrailImage;
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full z-20">
            {/* Race details overlay */}
            <div className="absolute top-4 right-4 p-4 rounded-lg text-white max-w-sm backdrop-blur-sm bg-black/50">
              <div className="space-y-2 text-shadow-lg">
                <p className="text-base font-medium flex items-center gap-2">
                  <CiCalendar className="text-lg" />
                  Fecha: {race?.release_date
                    ? new Date(race.release_date).toLocaleDateString()
                    : "No disponible"}
                </p>
                <p className="text-base font-medium flex items-center gap-2">
                  <GiPathDistance className="text-lg" />
                  Distancia: {race?.distance_km} km
                </p>
                <p className="text-base font-medium flex items-center gap-2">
                  <FaLocationDot className="text-lg" />
                  Provincia: {race?.location}
                </p>
                <p className="text-base font-medium flex items-center gap-2">
                  <GiLevelEndFlag className="text-lg" />
                  Desnivel: {race?.unevenness}m
                </p>
                <p className="text-base font-medium flex items-center gap-2">
                  <BiSolidCategory className="text-lg" />
                  Categoría: {race?.category}
                </p>
                <p className="text-base font-medium flex items-center gap-2">
                  Estado: <span
                    className={`ml-2 px-2 py-1 rounded ${
                      race?.status === "Open" 
                        ? "bg-green-500" 
                        : race?.status === "Closed" 
                        ? "bg-red-500" 
                        : race?.status === "Completed"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {race?.status}
                  </span>
                </p>
              </div>
            </div>
            {/* Race name */}
            <div className="absolute bottom-4 left-4">
              <h1 className="text-2xl sm:text-4xl font-bold text-white px-4 text-left shadow-text">
                {race?.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Tabla de información principal */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            {/* Columna izquierda */}
            <div className="space-y-6 p-6">
              {/* Fila de Descripción */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                  Descripción
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {race?.description}
                </p>
              </div>

              {/* Fila de Ubicación */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Ubicación</h2>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
                    <button 
                      className="bg-[#8EB486] text-white px-6 py-3 rounded-lg hover:bg-[#7a9c72] active:bg-[#6b8d63] transition-all duration-200 cursor-pointer flex items-center gap-2 w-full sm:w-auto justify-center" 
                      onClick={() => setShowMap(!showMap)}
                    >
                      {showMap ? 'Ocultar mapa' : 'Mostrar mapa'}
                    </button>
                    
                    {showMap && (
                      <button 
                        className="bg-[#4285F4] text-white px-6 py-3 rounded-lg hover:bg-[#3367D6] active:bg-[#2A56C6] transition-all duration-200 cursor-pointer flex items-center gap-2 w-full sm:w-auto justify-center" 
                        onClick={() => window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')}
                      >
                        Abrir en Google Maps
                        <FaExternalLinkAlt />
                      </button>
                    )}
                  </div>
                  
                  {showMap && (
                    <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                      <MapContainer 
                        center={[lat, lng]} 
                        zoom={13} 
                        style={{ height: "100%", width: "100%" }}
                        scrollWheelZoom={false}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[lat, lng]}>
                          <Popup>
                            <div className="text-center">
                              <strong>{race?.name}</strong><br />
                              {race?.location}
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Columna derecha - Inscripción */}
            <div className="bg-white p-6 border-l border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
                Inscripción
              </h2>
              <div className="space-y-4">
                <p className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Precio:</span>
                  <span className="text-lg text-gray-900">{race?.entry_fee}€</span>
                </p>
                <p className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Plazas disponibles:</span>
                  <span className="text-lg text-gray-900">{race?.available_slots}</span>
                </p>

                {isAuthenticated &&
                race?.status === "Open" &&
                race?.available_slots > 0 ? (
                  <button
                    className="w-full mt-6 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200 font-semibold"
                    onClick={handleRegistration}
                  >
                    Inscribirse ahora
                  </button>
                ) : (
                  <div className="mt-6 text-red-600 p-4 bg-red-50 rounded-lg text-center">
                    {!isAuthenticated
                      ? <span>Debes <Link to="/login" className="underline decoration-red-600">iniciar sesión</Link> para inscribirte</span>
                      : race?.available_slots <= 0
                      ? "No hay plazas disponibles"
                      : "Las inscripciones están cerradas"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sección de Participantes */}
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