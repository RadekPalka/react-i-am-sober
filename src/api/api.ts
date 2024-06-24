import axios from 'axios';

const api = axios.create({
	baseURL: 'https://mentoring-api.vercel.app/api/v1',
});

export default api;
