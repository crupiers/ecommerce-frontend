import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ColorActualizar from "../ColorActualizar.jsx";

test('Actualizar color, nombre y descripcion', () => {
    render(
        <MemoryRouter>
            <ColorActualizar />
        </MemoryRouter>
    );

    expect(screen.getByText('ACTUALIZAR COLOR')).toBeInTheDocument();
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