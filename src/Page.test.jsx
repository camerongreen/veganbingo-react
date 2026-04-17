import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import Page from './Page';
import { BingoProvider } from './services/BingoContext';

// Mock useParams and Link
vi.mock('react-router-dom', () => ({
  useParams: () => ({ name: 'bacon' }),
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}));

// Mock DataService
vi.mock('./services/DataService', () => {
  class DataServiceMock {
    getSection(name) {
      return Promise.resolve({
        name: name,
        heading: 'But bacon though...',
        colour: 'pink',
        alternatives: ['Try tempeh bacon', 'Try coconut bacon'],
        summary: 'There are great alternatives!',
        discussion: 'Here is a longer explanation about bacon alternatives.'
      });
    }
  }

  return {
    default: DataServiceMock,
  };
});

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

  const renderPage = async () => {
    let result;
    await act(async () => {
      result = render(
        <HelmetProvider>
          <BingoProvider sections={mockSections}>
            <Page />
          </BingoProvider>
        </HelmetProvider>
      );
    });
    return result;
  };

  it('should render without crashing', async () => {
    const { container } = await renderPage();
    expect(container).toBeInTheDocument();
  });

  it('should display the page heading', async () => {
    await renderPage();
    
    await waitFor(() => {
      expect(screen.getByText('But bacon though...')).toBeInTheDocument();
    });
  });

  it('should display alternatives', async () => {
    await renderPage();
    
    await waitFor(() => {
      expect(screen.getByText(/Try tempeh bacon/i)).toBeInTheDocument();
      expect(screen.getByText(/Try coconut bacon/i)).toBeInTheDocument();
    });
  });

  it('should display summary', async () => {
    await renderPage();
    
    await waitFor(() => {
      expect(screen.getByText('There are great alternatives!')).toBeInTheDocument();
    });
  });
});
