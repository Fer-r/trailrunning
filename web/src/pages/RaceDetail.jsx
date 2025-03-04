import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { getTrailRunningDetails } from '../services/useServices';
const RaceDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { data: race, loading, error } = useFetch(() => getTrailRunningDetails(id));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Cargando detalles de la carrera...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error al cargar los detalles: {error}</p>
        </div>
      </div>
    );
  }

  if (!race) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>No se encontró la carrera solicitada</p>
        </div>
      </div>
    );
  }

  const handleRegistration = async () => {
    // Aquí iría la lógica para inscribirse en la carrera
    try {
      // Implementar la lógica de inscripción
      console.log("Inscripción en proceso...");
    } catch (error) {
      console.error("Error en la inscripción:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Imagen y título */}
        <div className="relative h-96 w-full">
          <img
            src={race.image || 'https://via.placeholder.com/800x400'}
            alt={race.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{race.name}</h1>
              <p className="text-white/80 text-xl">{race.location}</p>
            </div>
          </div>
        </div>

        {/* Información principal */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Detalles de la Carrera</h2>
              <div className="space-y-4">
                <p className="flex items-center justify-between border-b pb-2">
                  <span className="font-semibold">Fecha:</span>
                  <span>{new Date(race.date).toLocaleDateString()}</span>
                </p>
                <p className="flex items-center justify-between border-b pb-2">
                  <span className="font-semibold">Distancia:</span>
                  <span>{race.distance_km} km</span>
                </p>
                <p className="flex items-center justify-between border-b pb-2">
                  <span className="font-semibold">Desnivel:</span>
                  <span>{race.unevenness}m</span>
                </p>
                <p className="flex items-center justify-between border-b pb-2">
                  <span className="font-semibold">Categoría:</span>
                  <span>{race.category}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="font-semibold">Estado:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    race.status === 'Open' ? 'bg-green-100 text-green-800' :
                    race.status === 'Closed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {race.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Inscripción</h2>
              <div className="space-y-4">
                <p className="flex items-center justify-between border-b pb-2">
                  <span className="font-semibold">Precio:</span>
                  <span className="text-2xl font-bold text-primary-600">{race.entry_fee}€</span>
                </p>
                <p className="flex items-center justify-between border-b pb-2">
                  <span className="font-semibold">Plazas disponibles:</span>
                  <span className="text-lg">{race.available_slots}</span>
                </p>
                
                {isAuthenticated && race.status === 'Open' && race.available_slots > 0 ? (
                  <button
                    className="w-full mt-6 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-200 font-semibold"
                    onClick={handleRegistration}
                  >
                    Inscribirse ahora
                  </button>
                ) : (
                  <p className="mt-6 text-center text-red-600 bg-red-50 p-3 rounded-lg">
                    {!isAuthenticated ? 'Debes iniciar sesión para inscribirte' :
                     race.available_slots <= 0 ? 'No hay plazas disponibles' :
                     'Las inscripciones están cerradas'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{race.description}</p>
          </div>

          {/* Mapa */}
          {race.coordinates && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Ubicación</h2>
              <div className="h-96 bg-gray-100 rounded-lg">
                {/* Aquí iría el componente del mapa */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">Mapa de la ubicación</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceDetail;