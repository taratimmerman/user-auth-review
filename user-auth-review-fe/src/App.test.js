import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders description', () => {
  render(<App />);
  const descriptionElement = screen.getByText(/user registration, login, authentication, authorization/i);
  expect(descriptionElement).toBeInTheDocument();
});
