import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorRegistrar from '../ColorRegistrar.jsx';

test('titulo renderizado', () => {
    render(<ColorRegistrar/>);
    expect(screen.getByText('REGISTRAR COLOR')).toBeInTheDocument();
})