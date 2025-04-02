import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders dashboard after login', async () => {
  render(<App />);
  const loginButton = screen.getByText(/Login/i);
  fireEvent.click(loginButton);

  const dashboardTitle = await screen.findByText(/BOTU Platform Dashboard/i);
  expect(dashboardTitle).toBeInTheDocument();
});
