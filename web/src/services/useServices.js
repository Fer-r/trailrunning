
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
  return await fetchFromAPI(`/api/trailrunning/${id}`);
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
export const getParticipants = async (page) => {
  return await fetchFromAPI("/api/participants", { page });
};

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
