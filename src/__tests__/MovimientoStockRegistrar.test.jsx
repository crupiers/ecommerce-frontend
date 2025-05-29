import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovimientoStockRegistrar from '../MovimientoStockRegistrar.jsx';

test('Registrar, formulario stock, tipo movimiento, cantidad ajustada, razon ajuste', () => {
    render(<MovimientoStockRegistrar/>);
    expect(screen.getByText('FORMULARIO STOCK')).toBeInTheDocument();
    expect(screen.getByText('Tipo Movimiento')).toBeInTheDocument();
    expect(screen.getByText('CANTIDAD AJUSTADA')).toBeInTheDocument();
    expect(screen.getByText('RAZÓN AJUSTE')).toBeInTheDocument();
})