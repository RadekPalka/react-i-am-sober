/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string; // Zdefiniuj swoje zmienne środowiskowe
	// Dodaj tutaj inne zmienne, jeśli są potrzebne
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
