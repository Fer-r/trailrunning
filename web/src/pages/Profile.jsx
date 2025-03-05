import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { getParticipant } from '../services/useServices';
// import {races} from '../services/races.json';
import RaceCard from '../components/RaceCard';

const Profile = () => {

  // const { user } = useAuth();
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    birthDate: '1990-01-01',
    phone: '+57 312 345 6789',
    gender: 'Male',
    height: 1.8,
    weight: 85,
    address: 'calle la piruleta',
    category:  'Trail Running',
    club: 'Need for Run',
    federationNumber: '123',
    registeredRaces: [1, 3, 5]
  }
  
  // const { data: participant, loading, error } = useFetch(() => getParticipant(user?.id));
  const { data: participants, loading, error } = useFetch(() => 
    fetch('/src/data/participants.json').then(res => res.json())
  );

// const { data: races, loading, error } = useFetch(() => getTrailRunning());
  const { data: races} = useFetch(() => 
    fetch('/src/data/races.json').then(res => res.json())
  );
  

  const participantRaces = races?.filter(race => {
    return participants?.some(participant => 
      participant.user_id === user.id && 
      participant.trail_running_id === race.id
    );
  }).map(race => {
    // Find the participant entry for this race
    const participantInfo = participants?.find(participant => 
      participant.user_id === user.id && 
      participant.trail_running_id === race.id
    );
    
    // Combine race and participant information
    return {
      ...race,
      dorsal: participantInfo?.dorsal,
      time: participantInfo?.time,
      banned: participantInfo?.banned
    };
  }) || [];

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="text-center text-red-600 p-4">
  //       {error}
  //     </div>
  //   );
  // }

  return (
    <>
    <div className="max-w-4xl mx-auto p-6 bg-green-200">
      <div className="card">
        {/* Profile Header */}
        <div className="relative h-48 -mx-6 -mt-6 mb-8 bg-primary-600 rounded-t-lg">
        <img
        src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop"
        alt="Trail running background"
        className="absolute inset-0 z-0 w-full h-full object-cover brightness-50"
        />
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src={user?.profileImage || "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=1200"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-20 px-10">
          <h1 className="text-4xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-gray-600">{user?.email}</p>


          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Información personal</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Sexo:</span>
                  <p className="text-gray-600">{user?.gender}</p>
                </div>
                <div>
                  <span className="font-medium">Tlf:</span>
                  <p className="text-gray-600">{user?.phone}</p>
                </div>
                <div>
                  <span className="font-medium">Edad:</span>
                  <p className="text-gray-600">
                    {user?.birthDate && calculateAge(user.birthDate)} años
                  </p>
                </div>
                <div>
                  <span className="font-medium">Dirección:</span>
                  <p className="text-gray-600">{user?.address}</p>
                </div>
              </div>
            </div>

            {/* Runner Information */}
            {/* <div>
              <h2 className="text-2xl font-semibold mb-4">Runner Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Category:</span>
                  <p className="text-gray-600">{participant?.category}</p>
                </div>
                <div>
                  <span className="font-medium">Club:</span>
                  <p className="text-gray-600">{participant?.club || 'Not specified'}</p>
                </div>
                <div>
                  <span className="font-medium">Federation Number:</span>
                  <p className="text-gray-600">{participant?.federationNumber || 'Not federated'}</p>
                </div>
              </div>
            </div> */}
          </div>
          {/* Race */}
          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button className="btn-primary px-4 py-2 rounded bg-amber-300 hover:bg-yellow-600">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto p-6 mt-6 bg-gray-300 rounded-3xl">
      <h2 className="text-2xl font-bold mb-4">Mis Carreras</h2>
        {participantRaces.length === 0 ? (
          <p className="text-gray-600 text-center py-4">
            No estas registrado en ninguna carrera.
          </p>
        ) : (
          <div className="space-y-4">
            {participantRaces.map((race) => (
              <div key={race.id} className="bg-white p-4 rounded-lg shadow">
                <RaceCard race={race} />
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-2">Detalles de participación:</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="font-medium">Dorsal:</span>
                      <p className="text-gray-600">{race.dorsal}</p>
                    </div>
                    <div>
                      <span className="font-medium">Tiempo:</span>
                      <p className="text-gray-600">{race.time || 'No disponible'}</p>
                    </div>
                    <div>
                      <span className="font-medium">Estado:</span>
                      <p className={`text-${race.banned ? 'red' : 'green'}-600`}>
                        {race.banned ? 'Baneado' : 'Activo'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
    </>
  );
};

export default Profile;