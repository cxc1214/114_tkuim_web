import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

const api = axios.create({
    baseURL: API_URL,
});

export const getItems = () => api.get('/');
export const getItem = (id) => api.get(`/${id}`);
export const createItem = (item) => api.post('/', item);
export const updateItem = (id, item) => api.put(`/${id}`, item);
export const deleteItem = (id) => api.delete(`/${id}`);

export default api;
