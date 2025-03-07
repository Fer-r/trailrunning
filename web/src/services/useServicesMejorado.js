const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchAPI = async (endpoint, options = {}) => {
    const {
        method = 'GET',
        data = null,
        signal = null,
        params = {}
    } = options;

    const config = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        signal
    };

    if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
        config.body = JSON.stringify(data);
    }

    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`Error ${method} data: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') throw error;
        throw new Error(`API Error: ${error.message}`);
    }
}

// TrailRunning endpoints
export const getTrailRunning = async (page, signal) => 
    fetchAPI("/trailrunning", { params: { page }, signal });

export const getTrailRunningDetails = async (id, signal) => 
    fetchAPI(`/api/trailrunning/${id}`, { signal });

export const updateTrailRunning = async (id, data, signal) => 
    fetchAPI(`/api/trailrunning/${id}`, { method: 'PUT', data, signal });

export const createTrailRunning = async (data, signal) => 
    fetchAPI('/api/trailrunning', { method: 'POST', data, signal });

export const deleteTrailRunning = async (id, signal) => 
    fetchAPI(`/api/trailrunning/${id}`, { method: 'DELETE', signal });

// Participants endpoints
export const getParticipants = async (page, signal) => 
    fetchAPI("/api/participants", { params: { page }, signal });

export const getParticipant = async (id, signal) => 
    fetchAPI(`/api/participants/${id}`, { signal });

export const createParticipant = async (data, signal) => 
    fetchAPI('/api/participants', { method: 'POST', data, signal });

export const updateParticipant = async (id, data, signal) => 
    fetchAPI(`/api/participants/${id}`, { method: 'PUT', data, signal });

export const deleteParticipant = async (id, signal) => 
    fetchAPI(`/api/participants/${id}`, { method: 'DELETE', signal });