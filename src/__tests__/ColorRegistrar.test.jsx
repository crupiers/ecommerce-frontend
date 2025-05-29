import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorRegistrar from '../ColorRegistrar.jsx';

test('titulo', () => {
    render(<ColorRegistrar/>);
    expect(screen.getByText('REGISTRAR COLOR')).toBeInTheDocument();
})

test('nombre', () => {
    render(<ColorRegistrar/>);
    expect(screen.getByText('NOMBRE')).toBeInTheDocument();
})

test('descripcion', () => {
    render(<ColorRegistrar/>);
    expect(screen.getByText('DESCRIPCIÓN')).toBeInTheDocument();
})