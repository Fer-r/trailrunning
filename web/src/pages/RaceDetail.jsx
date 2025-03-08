import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import { getTrailRunningDetails, unjoinRace } from "../services/useServices";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import defaultTrailImage from "../assets/default-trail.jpg";
import { CiCalendar } from "react-icons/ci";
import { GiLevelEndFlag, GiPathDistance } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
import { joinRace } from "../services/useServices";
const RaceDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [isJoining, setIsJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [joined, setJoined] = useState(null);
  const {
    data: race,
    error,
    loading,
  } = useFetch(() => getTrailRunningDetails(id), [id]);
  useEffect(() => {
    setParticipants(race?.trailRunningParticipants);
    setJoined(
      race?.trailRunningParticipants?.find(
        (participant) => participant.user?.id === user?.id
      ) || null
    );
  }, [race, user]);
  const coordinates = race?.coordinates
    ?.split(",")
    .map((coord) => parseFloat(coord)) || [0, 0];
  const [lat, lng] = coordinates;

  const handleJoinRaceButton = async () => {
    if (!isAuthenticated() || !user || !race) {
      return;
    }

    setIsJoining(true);
    setJoinMessage("");

    try {
      if (joined) {
        await unjoinRace(joined.id);
        setJoinMessage("¡Te has desinscrito correctamente a la carrera!");
      }else{
        await joinRace(race.id, user.id);
        setJoinMessage("¡Te has inscrito correctamente a la carrera!");
      }
      // Refresh participants list
      window.location.reload();
    } catch (error) {
      console.error("Error joining race:", error);
      setJoinMessage("Error al inscribirse. Por favor, inténtalo de nuevo.");
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
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
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Imagen de la carrera */}
        <div className="relative h-64 sm:h-96 w-full">
          <img
            src={race?.img || defaultTrailImage}
            alt={race?.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = defaultTrailImage;
            }}
          />

          {/* Estado en móvil (esquina superior) */}
          <div className="absolute top-4 right-4 sm:hidden">
            <span
              className={`px-3 py-1.5 rounded-full text-white font-medium text-sm shadow-lg ${
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
          </div>

          {/* Título y botón hamburguesa */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white px-4 text-left shadow-text break-words leading-tight bg-black/30 rounded-lg p-2">
              {race?.name}
            </h1>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-all sm:hidden"
            >
              <IoMenu className="text-2xl text-gray-800" />
            </button>
          </div>

          {/* Información en desktop */}
          <div className="absolute top-4 right-4 p-4 rounded-lg max-w-sm hidden sm:block bg-white/95 backdrop-blur-sm shadow-lg">
            <div className="space-y-2">
              <p className="text-base font-medium flex items-center gap-2 text-gray-800">
                <CiCalendar className="text-lg text-gray-600" />
                Fecha:{" "}
                {race?.release_date
                  ? new Date(race.release_date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No disponible"}
              </p>
              <p className="text-base font-medium flex items-center gap-2 text-gray-800">
                <CiCalendar className="text-lg text-gray-600" />
                Hora:{" "}
                {race?.release_date
                  ? new Date(race.release_date).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "No disponible"}
              </p>
              <p className="text-base font-medium flex items-center gap-2 text-gray-800">
                <GiPathDistance className="text-lg text-gray-600" />
                Distancia: {race?.distance_km} km
              </p>
              <p className="text-base font-medium flex items-center gap-2 text-gray-800">
                <FaLocationDot className="text-lg text-gray-600" />
                Provincia: {race?.location}
              </p>
              <p className="text-base font-medium flex items-center gap-2 text-gray-800">
                <GiLevelEndFlag className="text-lg text-gray-600" />
                Desnivel: {race?.unevenness}m
              </p>
              <p className="text-base font-medium flex items-center gap-2 text-gray-800">
                <BiSolidCategory className="text-lg text-gray-600" />
                Categoría: {race?.category}
              </p>
              <p className="text-base font-medium flex items-center gap-2 text-gray-800">
                Estado:{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
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
        </div>

        {/* Menú móvil */}
        <div
          className={`
          sm:hidden fixed inset-y-0 right-0 w-full bg-[#F8E4BE] shadow-xl z-50 
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto
          flex flex-col
          min-h-screen
        `}
        >
          {/* Cabecera del menú */}
          <div className="sticky top-0 bg-[#8EB486] p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-center w-full">
              Detalles de la carrera
            </h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Contenido del menú móvil centrado */}
          <div className="p-4 space-y-6 flex flex-col items-center flex-1">
            <div className="space-y-6 w-full max-w-sm">
              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <p className="flex flex-col items-center gap-1">
                  <CiCalendar className="text-2xl text-gray-600" />
                  <span className="text-sm text-gray-500">Fecha</span>
                  <span className="font-medium text-center">
                    {race?.release_date
                      ? new Date(race.release_date).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "No disponible"}
                  </span>
                </p>
                <p className="flex flex-col items-center gap-1">
                  <CiCalendar className="text-2xl text-gray-600" />
                  <span className="text-sm text-gray-500">Hora</span>
                  <span className="font-medium">
                    {race?.release_date
                      ? new Date(race.release_date).toLocaleTimeString(
                          "es-ES",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "No disponible"}
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <p className="flex flex-col items-center gap-1">
                  <GiPathDistance className="text-2xl text-gray-600" />
                  <span className="text-sm text-gray-500">Distancia</span>
                  <span className="font-medium">{race?.distance_km} km</span>
                </p>
                <p className="flex flex-col items-center gap-1">
                  <GiLevelEndFlag className="text-2xl text-gray-600" />
                  <span className="text-sm text-gray-500">Desnivel</span>
                  <span className="font-medium">{race?.unevenness}m</span>
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <p className="flex flex-col items-center gap-1">
                  <FaLocationDot className="text-2xl text-gray-600" />
                  <span className="text-sm text-gray-500">Ubicación</span>
                  <span className="font-medium">{race?.location}</span>
                </p>
                <p className="flex flex-col items-center gap-1">
                  <BiSolidCategory className="text-2xl text-gray-600" />
                  <span className="text-sm text-gray-500">Categoría</span>
                  <span className="font-medium">{race?.category}</span>
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">Estado</span>
                <span
                  className={`px-4 py-2 rounded-full text-white font-medium ${
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
              </div>
            </div>
          </div>

          {/* Footer con el color beige que ocupa todo el espacio restante */}
          <div className="bg-[#F8E4BE] w-full min-h-[200px] mt-auto flex flex-col justify-end">
            <div className="flex justify-center items-center p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2 rounded-lg bg-white text-gray-800 font-medium shadow-sm hover:shadow-md transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>

        {/* Overlay para cerrar el menú al hacer clic fuera (solo móvil) */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Tabla de información principal */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
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
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                  Ubicación
                </h2>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
                    <button
                      className="bg-[#8EB486] text-white px-6 py-3 rounded-lg hover:bg-[#7a9c72] active:bg-[#6b8d63] transition-all duration-200 cursor-pointer flex items-center gap-2 w-full sm:w-auto justify-center"
                      onClick={() => setShowMap(!showMap)}
                    >
                      {showMap ? "Ocultar mapa" : "Mostrar mapa"}
                    </button>

                    {showMap && (
                      <button
                        className="bg-[#4285F4] text-white px-6 py-3 rounded-lg hover:bg-[#3367D6] active:bg-[#2A56C6] transition-all duration-200 cursor-pointer flex items-center gap-2 w-full sm:w-auto justify-center"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps?q=${lat},${lng}`,
                            "_blank"
                          )
                        }
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
                              <strong>{race?.name}</strong>
                              <br />
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
                  <span className="text-lg text-gray-900">
                    {race?.entry_fee}€
                  </span>
                </p>
                <p className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">
                    Plazas disponibles:
                  </span>
                  <span className="text-lg text-gray-900">
                    {race?.available_slots}
                  </span>
                </p>

                {!isAuthenticated() ? (
                  <div className="mt-6 text-red-600 p-4 bg-red-50 rounded-lg text-center">
                    Debes{" "}
                    <Link to="/login" className="underline decoration-red-600">
                      iniciar sesión
                    </Link>{" "}
                    para inscribirte
                  </div>
                ) : (
                  <div className="mt-6">
                    <button
                      onClick={handleJoinRaceButton}
                      disabled={isJoining || loading || race?.status !== "open"}
                      className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 
                        ${
                          isJoining || race?.status !== "open"
                            ? "bg-gray-400 cursor-not-allowed"
                            : joined
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                      {isJoining
                        ? "Procesando..."
                        : joined
                        ? "Cancelar registro"
                        : race?.status !== "open"
                        ? "Inscripciones cerradas"
                        : "Unirse a la carrera"}
                    </button>
                    {joinMessage && (
                      <p
                        className={`mt-4 text-center text-sm font-medium ${
                          joinMessage.includes("Error")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {joinMessage}
                      </p>
                    )}
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
            {loading ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Cargando participantes...</p>
              </div>
            ) : error ? (
              <div className="text-center py-4">
                <p className="text-red-600">Error: {error}</p>
              </div>
            ) : participants?.length > 0 ? (
              <div className="space-y-3">
                {participants.map(
                  (participant) =>
                    !participant.banned && (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                            <span className="text-sky-600 font-semibold">
                              {participant.user.name?.[0]?.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {participant.user.name}
                            </h3>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          #{participant.dorsal || "N/A"}
                        </span>
                      </div>
                    )
                )}
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
