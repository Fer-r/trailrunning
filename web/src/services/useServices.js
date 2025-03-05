const BASE_URL = `http://${import.meta.env.VITE_URL_API}`;

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
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error posting data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error`, error);
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
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
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
  return await fetchFromAPI(`/trailrunning/${Number(id)}`);
};
export const getParticipants = async (race_id) => {
  try {
    const participants = await fetchFromAPI(`/participants?race_id=${race_id}`);
    const users = await fetchFromAPI("/users");

    if (!participants || !users) {
      throw new Error(
        "No se pudo obtener los datos de participantes o usuarios"
      );
    }

    return participants.map((participant) => {
      const user = users.find((u) => u.id === participant.user_id) || {};
      return {
        ...participant,
        name: user.name || "Usuario desconocido",
        email: user.email || "No disponible",
        banned: user.banned || participant.banned,
      };
    });
  } catch (error) {
    console.error("Error al obtener participantes:", error);
    throw new Error(`Error fetching participants: ${error.message}`);
  }
};

export const updateTrailRunning = async (id, data) => {
  return await putToAPI(`/api/trailrunning/${id}`, data);
};

// export const createTrailRunning = async (data) =>{
//     return await postToAPI(`/api/trailrunning/`, data);
// }

// export const deleteTrailRunning = async (id) =>{
//     return await deleteFromAPI(`/api/trailrunning/${id}`);
// }

//PARTICIPANTS

export const getParticipant = async (id) => {
  return await fetchFromAPI(`/api/participants/${id}`);
};

export const createParticipant = async (data) => {
  return await postToAPI(`/api/participants/`, data);
};

export const updateParticipant = async (id, data) => {
  return await putToAPI(`/api/participants/${id}`, data);
};

export const deleteParticipant = async (id) => {
  return await deleteFromAPI(`/api/participants/${id}`);
};
