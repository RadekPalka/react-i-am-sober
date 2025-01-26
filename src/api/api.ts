import axios from 'axios';

const api = axios.create({
	baseURL:
		import.meta.env.VITE_API_URL || 'https://mentoring-api.vercel.app/api/v1',
});

export default api;
