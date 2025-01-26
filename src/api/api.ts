import axios from 'axios';

const api = axios.create({
	baseURL:
		process.env.REACT_APP_API_URL || 'https://mentoring-api.vercel.app/api/v1',
});

export default api;
