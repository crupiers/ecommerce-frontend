import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarcaRegistrar from '../MarcaRegistrar.jsx';

test('Registrar marca, nombre y descripcion', () => {
    render(<MarcaRegistrar/>);
    expect(screen.getByText('REGISTRAR MARCA')).toBeInTheDocument();
    expect(screen.getByText('NOMBRE')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /REGISTRAR/i })).toBeInTheDocument();
})