import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from './Page';
import { BingoProvider } from './services/BingoContext';

// Mock useParams and Link
jest.mock('react-router-dom', () => ({
  useParams: () => ({ name: 'bacon' }),
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}), { virtual: true });

// Mock DataService
jest.mock('./services/DataService', () => {
  return jest.fn().mockImplementation(() => ({
    getSection: (name) => Promise.resolve({
      name: name,
      heading: 'But bacon though...',
      colour: 'pink',
      alternatives: ['Try tempeh bacon', 'Try coconut bacon'],
      short_answer: 'There are great alternatives!',
      long_answer: 'Here is a longer explanation about bacon alternatives.'
    })
  }));
});

// Mock require for images
jest.mock('../public/images/bacon.png', () => 'bacon.png', { virtual: true });
jest.mock('../public/images/bacon_done.png', () => 'bacon_done.png', { virtual: true });

const mockSections = ['protein', 'cheese', 'cow', 'bacon'];

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderPage = () => {
    return render(
      <BingoProvider sections={mockSections}>
        <Page />
      </BingoProvider>
    );
  };

  it('should render without crashing', () => {
    const { container } = renderPage();
    expect(container).toBeInTheDocument();
  });

  it('should display the page heading', async () => {
    renderPage();
    
    await waitFor(() => {
      expect(screen.getByText('But bacon though...')).toBeInTheDocument();
    });
  });

  it('should display alternatives', async () => {
    renderPage();
    
    await waitFor(() => {
      expect(screen.getByText(/Try tempeh bacon/i)).toBeInTheDocument();
      expect(screen.getByText(/Try coconut bacon/i)).toBeInTheDocument();
    });
  });

  it('should display short answer', async () => {
    renderPage();
    
    await waitFor(() => {
      expect(screen.getByText('There are great alternatives!')).toBeInTheDocument();
    });
  });
});
