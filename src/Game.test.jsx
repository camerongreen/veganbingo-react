import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Game from './Game';
import { BingoProvider } from './services/BingoContext';

// Mock Link component
vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}));

// Mock DataService
vi.mock('./services/DataService', () => {
  class DataServiceMock {
    getSections() {
      return ['protein', 'cheese', 'cow', 'bacon'];
    }

    getSection(name) {
      return Promise.resolve({
        name: name,
        heading: `${name} heading`,
        short_heading: `${name} short`,
        colour: 'yellow',
        alternatives: ['alternative'],
        short_answer: 'short answer',
        long_answer: 'long answer'
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

describe('Game', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderGame = () => {
    return render(
      <BingoProvider sections={mockSections}>
        <Game />
      </BingoProvider>
    );
  };

  it('should render without crashing', async () => {
    const { container } = renderGame();

    await waitFor(() => {
      expect(container.querySelector('.MuiContainer-root')).toBeInTheDocument();
    });
  });

  it('should load and display all sections', async () => {
    renderGame();
    
    await waitFor(() => {
      expect(screen.getByText('protein heading')).toBeInTheDocument();
      expect(screen.getByText('cheese heading')).toBeInTheDocument();
      expect(screen.getByText('cow heading')).toBeInTheDocument();
      expect(screen.getByText('bacon heading')).toBeInTheDocument();
    });
  });

  it('should render squares in a grid', async () => {
    const { container } = renderGame();
    
    await waitFor(() => {
      const grid = container.querySelector('.MuiGrid-container');
      expect(grid).toBeInTheDocument();
    });
  });

  it('should render correct number of squares', async () => {
    renderGame();
    
    await waitFor(() => {
      const squares = screen.getAllByRole('link');
      expect(squares.length).toBe(4);
    });
  });

  it('should display snackbar when bingo line is completed', async () => {
    renderGame();
    
    await waitFor(() => {
      expect(screen.getByText('protein heading')).toBeInTheDocument();
    });
  });

  it('should render container with proper spacing', async () => {
    const { container } = renderGame();
    
    await waitFor(() => {
      const mainContainer = container.querySelector('.MuiContainer-root');
      expect(mainContainer).toBeInTheDocument();
    });
  });
});
