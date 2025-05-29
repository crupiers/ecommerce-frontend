import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovimientoStockRegistrar from '../MovimientoStockRegistrar.jsx';

test('titulo visible', () => {
    render(<MovimientoStockRegistrar/>);
    expect(screen.getByText('FORMULARIO STOCK')).toBeInTheDocument();
})