import api from '../api/api';
import { AddictionData } from '../types/AddictionData';

export const createAccount = (
	username: string,
	password: string
): Promise<string> => {
	return api.post(
		'/account',
		{
			username,
			password,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
};

export const loginAction = (username: string, password: string) => {
	return api.post(
		'/account/login',
		{
			username,
			password,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
};

export const fetchUserData = (token: string) => {
	return api.get('/account/me', {
		headers: {
			Authorization: token,
		},
	});
};

export const createAddiction = (
	{ addictionType, addictionDailyCost }: AddictionData,
	token: string
) => {
	return api.post(
		'/addiction',
		{
			name: addictionType,
			costPerDay: addictionDailyCost,
		},
		{
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		}
	);
};

export const logout = (token: string): Promise<string> => {
	return api.post('/account/logout', {
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
};

export const getPaginatedAddictions = (token: string, pageNumber: number) => {
	return api.get('/addiction', {
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
		params: {
			page: pageNumber,
		},
	});
};
