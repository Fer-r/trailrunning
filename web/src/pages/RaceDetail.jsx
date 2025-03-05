import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { getTrailRunningDetails } from '../services/useServices';
const RaceDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { data: race, error, loading } = useFetch(() => getTrailRunningDetails(id), [id]);
  const [isRegistered, setIsRegistered] = useState(false);
  const handleRegistration = () => {
    if (isAuthenticated) {
      setIsRegistered(!isRegistered);
    } else {
      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = '/login';
    }
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
            src={race?.image || 'https://via.placeholder.com/800x400'}
            alt={race?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-white px-4 text-center">{race?.name}</h1>
          </div>
        </div>

        {/* Información principal */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Detalles de la Carrera</h2>
              <div className="space-y-3">
                <p><span className="font-semibold">Fecha:</span> {race?.date ? new Date(race.date).toLocaleDateString() : 'No disponible'}</p>
                <p><span className="font-semibold">Distancia:</span> {race?.distance_km} km</p>
                <p><span className="font-semibold">Ubicación:</span> {race?.location}</p>
                <p><span className="font-semibold">Desnivel:</span> {race?.unevenness}m</p>
                <p><span className="font-semibold">Categoría:</span> {race?.category}</p>
                <p><span className="font-semibold">Estado:</span> 
                  <span className={`ml-2 px-2 py-1 rounded ${
                    race?.status === 'Open' ? 'bg-green-100 text-green-800' :
                    race?.status === 'Closed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {race?.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Inscripción</h2>
              <div className="space-y-3">
                <p><span className="font-semibold">Precio:</span> {race?.entry_fee}€</p>
                <p><span className="font-semibold">Plazas disponibles:</span> {race?.available_slots}</p>
                
                {isAuthenticated && race?.status === 'Open' && race?.available_slots > 0 ? (
                  <button
                    className="w-full mt-4 bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary-700 active:bg-primary-800 transition duration-200"
                    onClick={handleRegistration}
                  >
                    Inscribirse ahora
                  </button>
                ) : (
                  <p className="text-red-600 mt-4">
                    {!isAuthenticated ? 'Debes iniciar sesión para inscribirte' :
                     race?.available_slots <= 0 ? 'No hay plazas disponibles' :
                     'Las inscripciones están cerradas'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Descripción</h2>
            <p className="text-gray-700 whitespace-pre-line">{race?.description}</p>
          </div>

          {/* Mapa (placeholder para futura implementación) */}
          {race?.coordinates && (
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Ubicación</h2>
              <div className="h-48 sm:h-64 bg-gray-200 rounded-lg">
                {/* TODO: Implementar el mapa */}
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