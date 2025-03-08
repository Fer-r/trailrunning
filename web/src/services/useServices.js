import { useAuth } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_URL_API;

const fetchFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error`, error);
  }
};

const postToAPI = async (endpoint, data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the JWT token
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error posting data: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Update joinRace function to handle the response better
export const joinRace = async (raceId, userId) => {
  try {
    return await postToAPI(`/api/trailrunning_participant/new`, {
      user: userId,
      trailRunning: raceId,
    });
  } catch (error) {
    console.error("Join race error:", error);
    throw new Error(
      "No se pudo inscribir en la carrera. Por favor, inténtalo de nuevo."
    );
  }
};
export const unjoinRace = async (participantId) => {
  try {
    return await deleteFromAPI(
      `/api/trailrunning_participant/${participantId}`
    );
  } catch (error) {
    console.error("Unjoin race error:", error);
    throw new Error(
      "No se pudo desinscribir de la carrera. Por favor, inténtalo de nuevo."
    );
  }
};
const putToAPI = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error updating data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error`, error);
  }
};

const deleteFromAPI = async (endpoint) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error deleting data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error`, error);
  }
};

//TRAILRUNNING
export const getTrailRunning = async (page) => {
  return await fetchFromAPI("/api/trailrunning", { page });
};

export const getTrailRunningDetails = async (id) => {
  return await fetchFromAPI(`/api/trailrunning/${Number(id)}`);
};
// export const getParticipants = async (race_id) => {
//   try {
//     const participants = await fetchFromAPI(`/api/trailrunning_participant`);
//     const users = await fetchFromAPI("/api/user");

//     if (!participants || !users) {
//       throw new Error(
//         "No se pudo obtener los datos de participantes o usuarios"
//       );
//     }

//     return participants.map((participant) => {
//       const user = users.find((u) => u.id === participant.user_id) || {};
//       return {
//         ...participant,
//         name: user.name || "Usuario desconocido",
//         email: user.email || "No disponible",
//         banned: user.banned || participant.banned,
//       };
//     });
//   } catch (error) {
//     console.error("Error al obtener participantes:", error);
//     throw new Error(`Error fetching participants: ${error.message}`);
//   }
// };

// export const updateTrailRunning = async (id, data) => {
//   return await putToAPI(`/api/trailrunning/${id}`, data);
// };

// export const createTrailRunning = async (data) =>{
//     return await postToAPI(`/api/trailrunning/`, data);
// }

// export const deleteTrailRunning = async (id) =>{
//     return await deleteFromAPI(`/api/trailrunning/${id}`);
// }

//PARTICIPANTS

export const getParticipant = async (id) => {
  return await fetchFromAPI(`/api/trailrunning_participant/${id}`);
};

// export const createParticipant = async (data) => {
//   return await postToAPI(`/api/trailrunning_participant/new`, data);
// };

export const updateParticipant = async (id, data) => {
  return await putToAPI(`/api/trailrunning_participant/${id}/edit`, data);
};

export const deleteParticipant = async (id) => {
  return await deleteFromAPI(`/api/trailrunning_participant/${id}`);
};
