import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MarcaActualizar from "../MarcaActualizar.jsx";

test('Actualizar Marca, nombre y descripcion', () => {
    render(
        <MemoryRouter>
            <MarcaActualizar />
        </MemoryRouter>
    );

    expect(screen.getByText('ACTUALIZAR MARCA')).toBeInTheDocument();
    expect(screen.getByText('NOMBRE')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ACTUALIZAR/i })).toBeInTheDocument();

    const nombreInput = screen.getByLabelText('NOMBRE');
    const descripcionInput = screen.getByLabelText('DESCRIPCIÓN');

    fireEvent.change(nombreInput, { target: { value: 'Nuevo Nombre' } });
    fireEvent.change(descripcionInput, { target: { value: 'Nueva Descripción' } });

    expect(nombreInput.value).toBe('Nuevo Nombre');
    expect(descripcionInput.value).toBe('Nueva Descripción');
});