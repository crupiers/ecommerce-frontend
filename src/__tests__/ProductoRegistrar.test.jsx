import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductoRegistrar } from '../ProductoRegistrar.jsx';

test('titulo, nombre y descripcion visibles', () => {
    render(<ProductoRegistrar/>);
    expect(screen.getByText('REGISTRAR PRODUCTO')).toBeInTheDocument();
    expect(screen.getByText('NOMBRE')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
})