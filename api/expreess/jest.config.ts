import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    
    roots: ["<rootDir>/src/__tests__"],
    moduleNameMapper: {
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@routes/(.*)$': '<rootDir>/src/routes/$1',
        '^@schemas/(.*)$': '<rootDir>/src/schemas/$1',
        '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
        '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
    }
};

export default config;
