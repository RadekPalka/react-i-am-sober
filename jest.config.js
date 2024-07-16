export default {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},

	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	collectCoverage: true,
	coverageReporters: ['text-summary', 'lcov'],
};
