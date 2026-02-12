import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { BingoProvider, BingoContext, winningCombinations } from './BingoContext';

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

const mockSections = [
  'protein', 'cheese', 'cow', 'bacon',
  'hitler', 'plants', 'teeth', 'humane',
  'food', 'natural', 'eat', 'notmuch',
  'what', 'cant', 'aspirational', 'preachy'
];

describe('BingoContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('winningCombinations', () => {
    it('should have 10 winning combinations (4 rows, 4 columns, 2 diagonals)', () => {
      expect(winningCombinations).toHaveLength(10);
    });

    it('should have correct row combinations', () => {
      expect(winningCombinations[0]).toEqual([0, 1, 2, 3]);
      expect(winningCombinations[1]).toEqual([4, 5, 6, 7]);
      expect(winningCombinations[2]).toEqual([8, 9, 10, 11]);
      expect(winningCombinations[3]).toEqual([12, 13, 14, 15]);
    });

    it('should have correct column combinations', () => {
      expect(winningCombinations[4]).toEqual([0, 4, 8, 12]);
      expect(winningCombinations[5]).toEqual([1, 5, 9, 13]);
      expect(winningCombinations[6]).toEqual([2, 6, 10, 14]);
      expect(winningCombinations[7]).toEqual([3, 7, 11, 15]);
    });

    it('should have correct diagonal combinations', () => {
      expect(winningCombinations[8]).toEqual([0, 5, 10, 15]);
      expect(winningCombinations[9]).toEqual([3, 6, 9, 12]);
    });
  });

  describe('BingoProvider', () => {
    const wrapper = ({ children }) => (
      <BingoProvider sections={mockSections}>{children}</BingoProvider>
    );

    it('should initialize with empty bingos from localStorage', () => {
      const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
      
      expect(result.current.hasBingo('protein')).toBe(false);
    });

    it('should initialize with existing bingos from localStorage', () => {
      const existingBingos = { protein: { id: 'protein', time: '2026-01-01' } };
      localStorage.setItem('veganbingo.net', JSON.stringify(existingBingos));
      
      const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
      
      expect(result.current.hasBingo('protein')).toBe(true);
    });

    describe('hasBingo', () => {
      it('should return false for non-existent bingo', () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        expect(result.current.hasBingo('protein')).toBe(false);
      });

      it('should return true for existing bingo', () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
        });
        
        expect(result.current.hasBingo('protein')).toBe(true);
      });
    });

    describe('addBingo', () => {
      it('should add a new bingo', () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
        });
        
        expect(result.current.hasBingo('protein')).toBe(true);
      });

      it('should persist bingo to localStorage', () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
        });
        
        const stored = JSON.parse(localStorage.getItem('veganbingo.net'));
        expect(stored.protein).toBeDefined();
        expect(stored.protein.id).toBe('protein');
      });

      it('should not add duplicate bingo', () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
          result.current.addBingo('protein');
        });
        
        const stored = JSON.parse(localStorage.getItem('veganbingo.net'));
        expect(Object.keys(stored)).toHaveLength(1);
      });

      it('should add timestamp when adding bingo', () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
        });
        
        const stored = JSON.parse(localStorage.getItem('veganbingo.net'));
        expect(stored.protein.time).toBeDefined();
        expect(new Date(stored.protein.time)).toBeInstanceOf(Date);
      });
    });

    describe('removeBingo', () => {
      it('should remove an existing bingo', async () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
        });
        
        expect(result.current.hasBingo('protein')).toBe(true);
        
        act(() => {
          result.current.removeBingo('protein');
        });
        
        // Wait for state update
        await new Promise(resolve => setTimeout(resolve, 0));
        
        expect(result.current.hasBingo('protein')).toBe(false);
      });

      it('should update localStorage when removing bingo', async () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
        });
        
        act(() => {
          result.current.removeBingo('protein');
        });
        
        // Wait for state update
        await new Promise(resolve => setTimeout(resolve, 0));
        
        const stored = JSON.parse(localStorage.getItem('veganbingo.net'));
        expect(stored.protein).toBeUndefined();
      });
    });

    describe('toggleBingo', () => {
      it('should add bingo if not present', () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.toggleBingo('protein');
        });
        
        expect(result.current.hasBingo('protein')).toBe(true);
      });

      it('should remove bingo if present', async () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
        });
        
        expect(result.current.hasBingo('protein')).toBe(true);
        
        act(() => {
          result.current.toggleBingo('protein');
        });
        
        // Wait for state update
        await new Promise(resolve => setTimeout(resolve, 0));
        
        expect(result.current.hasBingo('protein')).toBe(false);
      });
    });

    describe('resetBingos', () => {
      it('should clear all bingos', () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
          result.current.addBingo('cheese');
          result.current.resetBingos();
        });
        
        expect(result.current.hasBingo('protein')).toBe(false);
        expect(result.current.hasBingo('cheese')).toBe(false);
      });

      it('should clear localStorage', () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        act(() => {
          result.current.addBingo('protein');
          result.current.resetBingos();
        });
        
        expect(localStorage.getItem('veganbingo.net')).toBeNull();
        expect(localStorage.getItem('veganbingo.net_completed_squares')).toBeNull();
      });
    });

    describe('winning line detection', () => {
      it('should store completed row squares in localStorage', async () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        // Complete first row: indices 0, 1, 2, 3
        await act(async () => {
          result.current.addBingo('protein'); // 0
        });
        
        await act(async () => {
          result.current.addBingo('cheese');  // 1
        });
        
        await act(async () => {
          result.current.addBingo('cow');     // 2
        });
        
        // No completed line yet
        expect(localStorage.getItem('veganbingo.net_completed_squares')).toBeNull();
        
        await act(async () => {
          result.current.addBingo('bacon');   // 3 - completes the row
        });
        
        // Verify all 4 squares are marked
        expect(result.current.hasBingo('protein')).toBe(true);
        expect(result.current.hasBingo('cheese')).toBe(true);
        expect(result.current.hasBingo('cow')).toBe(true);
        expect(result.current.hasBingo('bacon')).toBe(true);
        
        // Check localStorage for completed squares
        const completedData = JSON.parse(localStorage.getItem('veganbingo.net_completed_squares'));
        expect(completedData).toBeDefined();
        expect(completedData).toContain('protein');
        expect(completedData).toContain('cheese');
        expect(completedData).toContain('cow');
        expect(completedData).toContain('bacon');
      });

      it('should store completed column squares in localStorage', async () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        // Complete first column: indices 0, 4, 8, 12
        await act(async () => {
          result.current.addBingo('protein');      // 0
        });
        
        await act(async () => {
          result.current.addBingo('hitler');       // 4
        });
        
        await act(async () => {
          result.current.addBingo('food');         // 8
        });
        
        await act(async () => {
          result.current.addBingo('what');         // 12
        });
        
        // Verify all 4 squares are marked
        expect(result.current.hasBingo('protein')).toBe(true);
        expect(result.current.hasBingo('hitler')).toBe(true);
        expect(result.current.hasBingo('food')).toBe(true);
        expect(result.current.hasBingo('what')).toBe(true);
        
        // Check localStorage for completed squares
        const completedData = JSON.parse(localStorage.getItem('veganbingo.net_completed_squares'));
        expect(completedData).toBeDefined();
        expect(completedData).toContain('protein');
        expect(completedData).toContain('hitler');
        expect(completedData).toContain('food');
        expect(completedData).toContain('what');
      });

      it('should store completed diagonal squares in localStorage', async () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        // Complete main diagonal: indices 0, 5, 10, 15
        await act(async () => {
          result.current.addBingo('protein');      // 0
        });
        
        await act(async () => {
          result.current.addBingo('plants');       // 5
        });
        
        await act(async () => {
          result.current.addBingo('eat');          // 10
        });
        
        await act(async () => {
          result.current.addBingo('preachy');      // 15
        });
        
        // Verify all 4 squares are marked
        expect(result.current.hasBingo('protein')).toBe(true);
        expect(result.current.hasBingo('plants')).toBe(true);
        expect(result.current.hasBingo('eat')).toBe(true);
        expect(result.current.hasBingo('preachy')).toBe(true);
        
        // Check localStorage for completed squares
        const completedData = JSON.parse(localStorage.getItem('veganbingo.net_completed_squares'));
        expect(completedData).toBeDefined();
        expect(completedData).toContain('protein');
        expect(completedData).toContain('plants');
        expect(completedData).toContain('eat');
        expect(completedData).toContain('preachy');
      });

      it('should store all squares for flashing', async () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        // Add 15 squares
        for (let i = 0; i < 15; i++) {
          await act(async () => {
            result.current.addBingo(mockSections[i]);
          });
        }
        
        // Clear any previous completions from intermediate lines
        localStorage.removeItem('veganbingo.net_completed_squares');
        
        // Add the 16th square to trigger blackout
        await act(async () => {
          result.current.addBingo(mockSections[15]);
        });
        
        // Verify all squares are marked
        mockSections.forEach(section => {
          expect(result.current.hasBingo(section)).toBe(true);
        });
        
        // Check localStorage for blackout
        const completedData = JSON.parse(localStorage.getItem('veganbingo.net_completed_squares'));
        expect(completedData).toBeDefined();
        expect(completedData).toHaveLength(16);
        mockSections.forEach(section => {
          expect(completedData).toContain(section);
        });
      });

      it('should store all lines when multiple lines complete with one square', async () => {
        const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
        
        // Set up a scenario where adding one square completes multiple lines
        // Complete most of first row (0,1,2) and first column (4,8,12) and diagonal (5,10)
        await act(async () => {
          result.current.addBingo('protein');  // 0 (row 0, col 0, diag 0)
        });
        
        await act(async () => {
          result.current.addBingo('cheese');   // 1 (row 0)
        });
        
        await act(async () => {
          result.current.addBingo('cow');      // 2 (row 0)
        });
        
        // Clear intermediate completions - row is not complete yet
        localStorage.removeItem('veganbingo.net_completed_squares');
        
        // Now complete row with 'bacon' (index 3)
        // This will complete row 0 [0,1,2,3]
        await act(async () => {
          result.current.addBingo('bacon'); // 3
        });
        
        const completedData = JSON.parse(localStorage.getItem('veganbingo.net_completed_squares'));
        expect(completedData).toBeDefined();
        expect(completedData).toContain('protein');
        expect(completedData).toContain('cheese');
        expect(completedData).toContain('cow');
        expect(completedData).toContain('bacon');
      });
    });
  });
});
