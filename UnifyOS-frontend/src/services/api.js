import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://unifyos-production.up.railway.app';

const api = axios.create({
    baseURL: API_URL,
});

export const workspaceService = {
    create: (data) => api.post('/workspaces/', data),
    get: (id) => api.get(`/workspaces/${id}`),
    update: (id, data) => api.patch(`/workspaces/${id}`, data),
    activate: (id) => api.post(`/workspaces/${id}/activate`),
};

export const opsService = {
    getDashboard: (id) => api.get(`/ops/dashboard/${id}`),
};

export default api;