import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarcaRegistrar from '../MarcaRegistrar.jsx';

test('titulo, nombre y descripcion visibles', () => {
    render(<MarcaRegistrar/>);
    expect(screen.getByText('REGISTRAR MARCA')).toBeInTheDocument();
    expect(screen.getByText('NOMBRE')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
})