import React from 'react';
import { render, screen } from '@testing-library/react';
import { MenuUsuario } from '../MenuUsuario';
import { BrowserRouter } from 'react-router-dom';

describe('MenuUsuario', () => {
    it('renderiza correctamente con los enlaces esperados', () => {
        // Necesitamos BrowserRouter porque MenuUsuario usa Link de react-router-dom
        render(
            <BrowserRouter>
                <MenuUsuario />
            </BrowserRouter>
        );

        // Verificamos que se muestran los textos de los enlaces
        expect(screen.getByText('CATÁLOGO')).toBeInTheDocument();
        expect(screen.getByText('ESTADÍSTICAS')).toBeInTheDocument();

        // Verificamos que los enlaces tienen las URLs correctas
        const catalogoLink = screen.getByText('CATÁLOGO').closest('a');
        const estadisticasLink = screen.getByText('ESTADÍSTICAS').closest('a');

        expect(catalogoLink).toHaveAttribute('href', '/catalogo');
        expect(estadisticasLink).toHaveAttribute('href', '/estadisticas');
    });

    it('tiene los estilos correctos para los enlaces', () => {
        render(
            <BrowserRouter>
                <MenuUsuario />
            </BrowserRouter>
        );

        // Verificamos que los enlaces tienen los estilos definidos
        const catalogoLink = screen.getByText('CATÁLOGO').closest('a');
        const estadisticasLink = screen.getByText('ESTADÍSTICAS').closest('a');

        expect(catalogoLink).toHaveClass('me-2');
        expect(estadisticasLink).toHaveClass('me-2');

        // Verificamos el estilo inline (aunque esto es más limitado en RTL)
        expect(catalogoLink).toHaveStyle('text-decoration: none');
        expect(catalogoLink).toHaveStyle('color: rgb(128, 128, 128)');
        expect(estadisticasLink).toHaveStyle('text-decoration: none');
        expect(estadisticasLink).toHaveStyle('color: rgb(128, 128, 128)');
    });
});