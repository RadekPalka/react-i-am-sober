import api from '../api/api';
import { AddictionData } from '../types/AddictionData';
import { getToken } from './SessionTokenService';

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

export const fetchUserData = () => {
	const token = getToken();
	return api.get('/account/me', {
		headers: {
			Authorization: token,
		},
	});
};

export const createAddiction = ({
	addictionType,
	addictionDailyCost,
	detoxStartDate,
}: AddictionData) => {
	const token = getToken();
	return api.post(
		'/addiction',
		{
			name: addictionType,
			costPerDay: addictionDailyCost,
			createdAt: detoxStartDate,
		},
		{
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		}
	);
};

export const logout = (): Promise<string> => {
	const token = getToken();
	return api.post('/account/logout', {
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
};

export const getPaginatedAddictions = (pageNumber: number) => {
	const token = getToken();
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

export const getAddictionDetails = (id: number) => {
	const token = getToken();
	return api.get(`/addiction/${id}`, {
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
};

export const deleteAddiction = (id: number) => {
	const token = getToken();
	return api.delete(`/addiction/${id}`, {
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
};

export const updateAddiction = (
	id: number,
	name: string,
	costPerDay: number,
	createdAt: string
) => {
	const token = getToken();
	return api.put(
		`/addiction/${id}`,
		{
			name,
			costPerDay,
			createdAt,
		},
		{
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		}
	);
};
