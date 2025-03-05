import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { getTrailRunningDetails } from '../services/useServices';
import { useState } from 'react';
import example from "../example";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RaceDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  // const { data: error, loading } = useFetch(() => getTrailRunningDetails(id), [id]);
  const [isRegistered, setIsRegistered] = useState(false);
  const race = example.races.find(race => race.id === parseInt(id));

  // Parse coordinates from string to array of numbers
  const coordinates = race?.coordinates?.split(',').map(coord => parseFloat(coord)) || [0, 0];
  const [lat, lng] = coordinates;

  const handleRegistration = () => {
    if (isAuthenticated) {
      setIsRegistered(!isRegistered);
    }
  };

  const [showMap, setShowMap] = useState(false);
  
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[60vh]">
  //       <p className="text-lg text-slate-600">Cargando...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="max-w-4xl mx-auto p-4 sm:p-6">
  //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
  //         <p>Error: {error}</p>
  //       </div>
  //     </div>
  //   );
  // }
  
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
                <p><span className="font-semibold">Provincia:</span> {race?.location}</p>
                <p><span className="font-semibold">Desnivel:</span> {race?.unevenness}m</p>
                <p><span className="font-semibold">Categoría:</span> {race?.category}</p>
                <p><span className="font-semibold">Estado:</span> 
                  <span className={`ml-2 px-2 py-1 rounded ${
                    race?.status === 'Open' ? 'bg-green-100 text-green-800' :
                    race?.status === 'Closed' ? 'bg-red-100 text-red-800' :
                    'bg-amber-100 text-amber-800'
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
                    className="w-full mt-4 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200"
                    onClick={handleRegistration}
                  >
                    Inscribirse ahora
                  </button>
                ) : (
                  <p className="text-red-600 mt-4">
                    <a href='/login'>
                    {!isAuthenticated ? 'Debes iniciar sesión para inscribirte' :
                     race?.available_slots <= 0 ? 'No hay plazas disponibles' :
                     'Las inscripciones están cerradas'}</a>
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
          <br />
          
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Ubicación</h2>
            <div className="space-y-4">
              <button 
                className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 active:bg-green-800 transition duration-200" 
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? 'Ocultar mapa' : 'Mostrar mapa'}
              </button>
              
              {showMap && (
                <div className="space-y-4">
                  <button 
                    className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200" 
                    onClick={() => window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')}
                  >
                    Ver en Google Maps
                  </button>
                  
                  <div className="h-[400px] rounded-lg overflow-hidden border border-gray-300">
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
                </div>
              )}
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default RaceDetail;