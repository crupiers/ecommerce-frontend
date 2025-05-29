import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import TamanioActualizar from "../TamanioActualizar.jsx";

test('Actualizar tamaño, nombre y descripcion', () => {
    render(
        <MemoryRouter>
            <TamanioActualizar />
        </MemoryRouter>
    );

    expect(screen.getByText('ACTUALIZAR TAMAÑO')).toBeInTheDocument();
    expect(screen.getByText('NOMBRE (no se puede poner la letra "ñ")')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ACTUALIZAR/i })).toBeInTheDocument();

    const nombreInput = screen.getByLabelText('NOMBRE (no se puede poner la letra "ñ")');
    const descripcionInput = screen.getByLabelText('DESCRIPCIÓN');

    fireEvent.change(nombreInput, { target: { value: 'Nuevo Nombre' } });
    fireEvent.change(descripcionInput, { target: { value: 'Nueva Descripción' } });

    expect(nombreInput.value).toBe('Nuevo Nombre');
    expect(descripcionInput.value).toBe('Nueva Descripción');
});