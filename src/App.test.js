import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock RouterProvider since we just want to test that App renders
jest.mock('react-router-dom', () => ({
  RouterProvider: () => <div data-testid="router-provider">Router Mock</div>,
  createBrowserRouter: jest.fn(() => ({})),
}), { virtual: true });

describe('App', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
