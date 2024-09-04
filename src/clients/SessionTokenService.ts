export const getToken = (): string | null => {
	return (
		localStorage.getItem('sessionToken') ||
		sessionStorage.getItem('sessionToken')
	);
};

export const saveToken = (rememberedMe: boolean, token: string): void => {
	const storage = rememberedMe ? localStorage : sessionStorage;
	storage.setItem('sessionToken', token);
};

export const removeToken = (): void => {
	localStorage.removeItem('sessionToken');
	sessionStorage.removeItem('sessionToken');
};
