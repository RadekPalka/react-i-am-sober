import api from '../api/api';
import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';
import { UserData } from '../types/UserData';
export const createAccount = (
	username: string,
	password: string,
	navigate: NavigateFunction
) => {
	api
		.post(
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
		)
		.then(function (response) {
			console.log(response);
			toast.success('Rejestracja zakończona sukcesem');
			navigate('/login-page');
		})
		.catch(function (error) {
			toast.error('Podany login jest już zajęty');
			console.log('Error');
			console.log(error);
			console.log('Kod błędu: ' + error.response.status);
			error.response.status === 400
				? toast.error('Podany login jest już zajęty')
				: toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
		});
};

export const loginAction = (
	username: string,
	password: string,
	navigate: NavigateFunction
) => {
	api
		.post(
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
		)
		.then(function (response) {
			console.log(response);
			localStorage.setItem('sessionToken', response.data.sessionToken);
			navigate('/dashboard');
		})
		.catch(function (error) {
			console.log(error);
			console.log('Kod błędu: ' + error.response.status);
			error.response.status === 401
				? toast.error('Zły login lub hasło')
				: toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
		});
};

export const getUserData = (
	navigate: NavigateFunction,
	setUserData: React.Dispatch<React.SetStateAction<UserData>>
) => {
	const token = localStorage.getItem('sessionToken');
	if (token) {
		api
			.get('/account/me', {
				headers: {
					Authorization: `${token}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setUserData((prevState: UserData) => ({
					...prevState,
					id: response.data.id,
					login: response.data.username,
				}));
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				error.response.status === 401
					? toast.error('Błąd autoryzacji')
					: toast.error('Błąd połączenia. Spróbuj ponownie później');
				navigate('/');
			});
	} else {
		toast.error('Błąd autoryzacji');
		navigate('/');
	}
};

export const createAddiction = (
	token: string | null,
	{ addictionType, addictionDailyCost, addictionFreeDate }: UserData,
	navigate: NavigateFunction
) => {
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

export const logout = (navigate: NavigateFunction) => {
	const token = localStorage.getItem('sessionToken');
	api
		.post('/account/logout', {
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		})
		.then((res) => {
			localStorage.removeItem('sessionToken');
			console.log(res);
			toast.success('Zostałeś wylogowany(a) pomyślnie');
			navigate('/login-page');
		})
		.catch((error) => {
			console.log(error);
			toast.error('Błąd połączenia. Spróbuj ponownie później');
		});
};
