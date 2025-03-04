import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { getParticipant } from '../services/useServices';

const Profile = () => {
  const { user } = useAuth();
  const { data: participant, loading, error } = useFetch(() => getParticipant(user?.id));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card">
        {/* Profile Header */}
        <div className="relative h-48 -mx-6 -mt-6 mb-8 bg-primary-600 rounded-t-lg">
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src={participant?.profileImage || 'https://via.placeholder.com/128'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-20">
          <h1 className="text-3xl font-bold text-gray-900">{participant?.name}</h1>
          <p className="text-gray-600">{participant?.email}</p>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button className="btn-primary">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;