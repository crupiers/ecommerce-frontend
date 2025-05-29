import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorRegistrar from '../ColorRegistrar.jsx';

test('Registrar color, nombre y descripcion', () => {
    render(<ColorRegistrar/>);
    expect(screen.getByText('REGISTRAR COLOR')).toBeInTheDocument();
    expect(screen.getByText('NOMBRE')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /REGISTRAR/i })).toBeInTheDocument();
})