import axios from 'axios';

// Force HTTPS by hardcoding it here if the env variable is missing or wrong
const BASE_URL = import.meta.env.VITE_API_URL || 'https://unifyos-production.up.railway.app';

// Ensure there is no trailing slash which causes redirects
const cleanURL = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;

const api = axios.create({
    baseURL: cleanURL,
});

export const workspaceService = {
    // Ensure this matches the backend (no slash)
    create: (data) => api.post('/workspaces', data),
    get: (id) => api.get(`/workspaces/${id}`),
    update: (id, data) => api.patch(`/workspaces/${id}`, data),
    activate: (id) => api.post(`/workspaces/${id}/activate`),
};

export default api;