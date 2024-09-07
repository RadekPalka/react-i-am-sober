import api from '../api/api';
import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';
import { UserData } from '../types/UserData';

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

export const fetchUserData = (token: string | null) => {
	return api.get('/account/me', {
		headers: {
			Authorization: token,
		},
	});
};

export const createAddiction = (
	{ addictionType, addictionDailyCost, addictionFreeDate }: UserData,
	navigate: NavigateFunction
) => {
	const token = localStorage.getItem('sessionToken');
	api
		.post(
			'/addiction',
			{
				name: addictionType,
				costPerDay: addictionDailyCost,
				deadline: addictionFreeDate,
			},
			{
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
			}
		)
		.then((res) => {
			console.log(res);
			toast.success('Uzależnienie dodano pomyślnie');
			navigate('/dashboard');
		})
		.catch((error) => {
			console.log(error);
			if (error.response.status === 400) {
				toast.error(
					'Wprowadzone dane są nieprawidłowe. Proszę sprawdzić formularz i spróbować ponownie.'
				);
			} else if (error.response.status === 401) {
				toast.error('Sesja wygasła. Proszę zalogować się ponownie.');
				navigate('/login-page');
			} else {
				toast.error(
					'Wystąpił problem z serwerem. Proszę spróbować ponownie później.'
				);
			}
		});
};

export const logout = (token: string | null): Promise<string> => {
	return api.post('/account/logout', {
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
};
