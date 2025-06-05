import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';

// Mock de react-dom/client
jest.mock('react-dom/client', () => ({
    createRoot: jest.fn(() => ({
        render: jest.fn()
    }))
}));

// Mock de App
jest.mock('../App', () => () => <div>App Mock</div>);

describe('Main', () => {
    let originalCreateElement;

    beforeEach(() => {
        // Mock getElementById
        originalCreateElement = document.getElementById;
        document.getElementById = jest.fn().mockReturnValue({});

        // Limpiar cualquier llamada previa
        jest.clearAllMocks();
    });

    afterEach(() => {
        document.getElementById = originalCreateElement;
    });

    it('renderiza la aplicación en el elemento root', () => {
        // Importar Main ejecuta el código
        require('../Main');

        // Verifica que se obtuvo el elemento root
        expect(document.getElementById).toHaveBeenCalledWith('root');

        // Verifica que se llamó a createRoot
        expect(createRoot).toHaveBeenCalled();

        // Verifica que se llamó al método render en el root
        const mockRoot = createRoot.mock.results[0].value;
        expect(mockRoot.render).toHaveBeenCalled();
    });
});