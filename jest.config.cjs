module.exports = {
 testEnvironment: 'jest-environment-jsdom',
 transform: {
 '^.+\\.jsx?$': 'babel-jest', // Transforms JavaScript and JSX files using Babel
 },
 moduleNameMapper: {
 '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock CSS imports
 },
 setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Setup file for Jest DOM
 testMatch: ['**/__tests__/**/*.test.jsx'], // Pattern to find test files
 moduleDirectories: ['node_modules', 'src'], // Allow absolute imports from 'src'
 };

