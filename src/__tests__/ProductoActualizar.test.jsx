import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import {ProductoActualizar} from "../ProductoActualizar.jsx";

test('Actualizar producto, nombre, descripcion, precio, stock, umbral, color, categoria, marca, tamaño y codigo barra', () => {
    render(
        <MemoryRouter>
            <ProductoActualizar/>
        </MemoryRouter>
    );

    expect(screen.getByText('ACTUALIZAR PRODUCTO')).toBeInTheDocument();
    expect(screen.getByText('NOMBRE')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
    expect(screen.getByText('PRECIO')).toBeInTheDocument();
    expect(screen.getByText('STOCK')).toBeInTheDocument();
    expect(screen.getByText('UMBRAL')).toBeInTheDocument();
    expect(screen.getByText('COLOR')).toBeInTheDocument();
    expect(screen.getByText('CATEGORIA')).toBeInTheDocument();
    expect(screen.getByText('MARCA')).toBeInTheDocument();
    expect(screen.getByText('TAMAÑO')).toBeInTheDocument();
    expect(screen.getByText('CODIGO DE BARRA')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ACTUALIZAR/i })).toBeInTheDocument();

    const nombreInput = screen.getByLabelText('NOMBRE');
    const descripcionInput = screen.getByLabelText('DESCRIPCIÓN');
    const precioInput = screen.getByLabelText('PRECIO');
    const stockInput = screen.getByLabelText('STOCK');
    const umbralInput = screen.getByLabelText('UMBRAL');
    const colorInput = screen.getByLabelText('COLOR');
    const categoriaInput = screen.getByLabelText('CATEGORIA');
    const marcaInput = screen.getByLabelText('MARCA');
    const tamanoInput = screen.getByLabelText('TAMAÑO');
    const codigoBarraInput = screen.getByLabelText('CODIGO DE BARRA');


    fireEvent.change(nombreInput, { target: { value: 'Nuevo Nombre' } });
    fireEvent.change(descripcionInput, { target: { value: 'Nueva Descripción' } });

    expect(nombreInput.value).toBe('Nuevo Nombre');
    expect(descripcionInput.value).toBe('Nueva Descripción');
});