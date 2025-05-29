import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TamanioRegistrar from '../TamanioRegistrar.jsx';

test('titulo, nombre y descripcion visibles', () => {
    render(<TamanioRegistrar/>);
    expect(screen.getByText('REGISTRAR TAMAÑO')).toBeInTheDocument();
    expect(screen.getByText('NOMBRE (no se puede poner la letra "ñ")')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
})