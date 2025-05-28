import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../LoginPage.jsx';
import React from 'react';
import ColorRegistrar from '../ColorRegistrar.jsx';


test('FUCNIONA', () => {
    render(<ColorRegistrar />);
    expect(screen.getByText('REGISTRAR COLOR')).toBeInTheDocument();
})