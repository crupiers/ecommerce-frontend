import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PanelAdmin from '../PanelAdmin';
import { BrowserRouter } from 'react-router-dom';

describe('PanelAdmin', () => {
    it('renderiza correctamente con los dropdowns principales', () => {
        render(
            <BrowserRouter>
                <PanelAdmin />
            </BrowserRouter>
        );

        // Verificamos que se muestran los títulos de los dropdowns principales
        expect(screen.getByText('AUDITORIA')).toBeInTheDocument();
        expect(screen.getByText('REGISTRAR')).toBeInTheDocument();
        expect(screen.getByText('LISTAR')).toBeInTheDocument();
        expect(screen.getByText('ESTADÍSTICAS ADMIN')).toBeInTheDocument();
    });

    it('muestra las opciones correctas al expandir el dropdown de AUDITORIA', () => {
        render(
            <BrowserRouter>
                <PanelAdmin />
            </BrowserRouter>
        );

        // Expandimos el dropdown de AUDITORIA
        const auditoriaDropdown = screen.getByText('AUDITORIA');
        fireEvent.click(auditoriaDropdown);

        // Verificamos que se muestran todas las opciones de AUDITORIA
        expect(screen.getByText('COLOR')).toBeInTheDocument();
        expect(screen.getByText('MARCA')).toBeInTheDocument();
        expect(screen.getByText('CATEGORIA')).toBeInTheDocument();
        expect(screen.getByText('TAMAÑO')).toBeInTheDocument();
        expect(screen.getByText('PRODUCTO')).toBeInTheDocument();
        expect(screen.getByText('MOVIMIENTO STOCK')).toBeInTheDocument();
        expect(screen.getByText('PEDIDOS')).toBeInTheDocument();
    });

    it('muestra las opciones correctas al expandir el dropdown de REGISTRAR', () => {
        render(
            <BrowserRouter>
                <PanelAdmin />
            </BrowserRouter>
        );

        // Expandimos el dropdown de REGISTRAR
        const registrarDropdown = screen.getByText('REGISTRAR');
        fireEvent.click(registrarDropdown);

        // Verificamos que se muestran todas las opciones de REGISTRAR
        expect(screen.getByText('REGISTRAR COLOR')).toBeInTheDocument();
        expect(screen.getByText('REGISTRAR MARCA')).toBeInTheDocument();
        expect(screen.getByText('REGISTRAR CATEGORÍA')).toBeInTheDocument();
        expect(screen.getByText('REGISTRAR TAMAÑO')).toBeInTheDocument();
        expect(screen.getByText('REGISTRAR PRODUCTO')).toBeInTheDocument();
        expect(screen.getByText('REGISTRAR MOVIMIENTO STOCK')).toBeInTheDocument();
    });

    it('muestra las opciones correctas al expandir el dropdown de LISTAR', () => {
        render(
            <BrowserRouter>
                <PanelAdmin />
            </BrowserRouter>
        );

        // Expandimos el dropdown de LISTAR
        const listarDropdown = screen.getByText('LISTAR');
        fireEvent.click(listarDropdown);

        // Verificamos que se muestran todas las opciones de LISTAR
        expect(screen.getByText('LISTAR COLORES')).toBeInTheDocument();
        expect(screen.getByText('LISTAR MARCAS')).toBeInTheDocument();
        expect(screen.getByText('LISTAR CATEGORÍAS')).toBeInTheDocument();
        expect(screen.getByText('LISTAR TAMAÑOS')).toBeInTheDocument();
        expect(screen.getByText('LISTAR PRODUCTOS')).toBeInTheDocument();
    });

    it('tiene el enlace correcto para ESTADÍSTICAS ADMIN', () => {
        render(
            <BrowserRouter>
                <PanelAdmin />
            </BrowserRouter>
        );

        // Verificamos que el enlace de ESTADÍSTICAS ADMIN tiene la URL correcta
        const estadisticasAdminLink = screen.getByText('ESTADÍSTICAS ADMIN').closest('a');
        expect(estadisticasAdminLink).toHaveAttribute('href', '/estadisticas/admin');

        // Verificamos los estilos
        expect(estadisticasAdminLink).toHaveClass('ms-2');
        expect(estadisticasAdminLink).toHaveClass('text-nowrap');
        expect(estadisticasAdminLink).toHaveStyle('text-decoration: none');
        expect(estadisticasAdminLink).toHaveStyle('color: rgb(128, 128, 128)');
    });
});