export const getToken = (): string | null => {
	return (
		localStorage.getItem('sessionToken') ||
		sessionStorage.getItem('sessionToken')
	);
};

export const removeToken = (): void => {
	localStorage.removeItem('sessionToken');
	sessionStorage.removeItem('sessionToken');
};

export const saveToken = (rememberedMe: boolean, token: string): void => {
	removeToken();
	const storage = rememberedMe ? localStorage : sessionStorage;
	storage.setItem('sessionToken', token);
};
