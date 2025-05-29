import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoriaRegistrar from '../CategoriaRegistrar.jsx';

test('titulo, nombre y descripcion visibles', () => {
    render(<CategoriaRegistrar/>);
    expect(screen.getByText('REGISTRAR CATEGORÍA')).toBeInTheDocument();
    expect(screen.getByText('NOMBRE')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
})