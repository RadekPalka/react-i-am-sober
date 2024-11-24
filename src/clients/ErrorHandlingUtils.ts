import { AxiosError } from 'axios';

export const isNetworkOrServerError = (error: AxiosError) =>
	!error.response ||
	(error.response.status >= 500 && error.response.status < 600);
