import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../pages/Register';
import { BrowserRouter } from 'react-router-dom';

describe('Register Page', () => {
  test('renders form inputs and register button', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('shows error when fields are empty', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
  });
});
