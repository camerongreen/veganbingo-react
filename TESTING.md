# Vegan Bingo - Test Suite Documentation

## Overview
Comprehensive unit tests for the Vegan Bingo React application covering core components, services, and game logic.

## Test Coverage

### Components Tested

#### ✅ App.test.js
- App component rendering

#### ✅ Square.test.js (9 tests)
- Square rendering and display
- Color application
- Image switching (regular vs. completed)
- Navigation links
- Card component structure

#### ✅ Game.test.js (5 tests)
- Game grid rendering
- Section loading and display
- Grid layout structure
- Snackbar functionality

#### ✅ InfoPage.test.js (8 tests)
- Page layout and structure
- Icon and heading display
- Children content rendering
- Navigation elements
- Material-UI component structure

#### ✅ Title.test.js (4 tests)
- Title component rendering
- Typography styling
- Children prop handling

#### ⚠️ Page.test.js (4 tests - needs Helmet mock)
- Detail page rendering
- Content display (heading, alternatives, short answers)
- *Note: Currently has issues with @dr.pogodin/react-helmet in test environment*

### Services Tested

#### ✅ DataService.test.js (7 tests)
- Section retrieval and caching
- Lazy loading of section modules
- Color assignment (cyclic pattern)
- Section data validation

#### ⚠️ BingoContext.test.js (22 tests)
Comprehensive testing of game state management:
- **Context Setup**: Winning combinations validation (rows, columns, diagonals)
- **Bingo Operations**:
  - Adding bingos with timestamps
  - Removing bingos
  - Toggling bingo states
  - Preventing duplicates
- **LocalStorage Integration**:
  - Persistence of game state
  - Loading existing state
  - Clearing on reset
- **Winning Logic**:
  - Row completion detection
  - Column completion detection
  - Diagonal completion detection
  - Blackout (full board) detection
  - *Note: Some async state propagation tests may need adjustments*

## Test Statistics

- **Total Test Suites**: 8
- **Passing Suites**: 6
- **Failing Suites**: 2 (minor async/mock issues)
- **Total Tests**: 62
- **Passing Tests**: 55
- **Failing Tests**: 7

## Running Tests

```bash
# Run all tests once
npm test -- --watchAll=false

# Run tests in watch mode
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Run specific test file
npm test Square.test.js
```

## Test Dependencies

- `@testing-library/react` - React component testing
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `jest` (via react-scripts) - Test runner

## Known Issues & Improvements Needed

### Page Component Tests
- **Issue**: Helmet component causes test failures in jsdom environment
- **Solution**: Mock `@dr.pogodin/react-helmet` or use `react-helmet-async`

### BingoContext Async Tests
- **Issue**: Some async state updates in winning detection tests
- **Status**: Core functionality verified; edge cases may need refinement

## Test Patterns Used

### Component Mocking
```javascript
// Mocking react-router-dom Link component
jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}), { virtual: true });
```

### LocalStorage Mocking
```javascript
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
```

### Context Testing
```javascript
const wrapper = ({ children }) => (
  <BingoProvider sections={mockSections}>{children}</BingoProvider>
);

const { result } = renderHook(() => React.useContext(BingoContext), { wrapper });
```

## Best Practices Followed

1. **Isolation**: Each test suite clears localStorage and mocks before running
2. **Assertions**: Clear, specific expectations for each test case
3. **Coverage**: Tests cover happy paths, edge cases, and error conditions
4. **Maintainability**: Tests use helper functions and shared mocks
5. **Documentation**: Descriptive test names explain what is being tested

## Future Enhancements

- [ ] Add integration tests for full user workflows
- [ ] Add E2E tests with Cypress or Playwright
- [ ] Increase coverage to 90%+ for all components
- [ ] Add snapshot testing for stable UI components
- [ ] Mock Helmet properly for Page tests
- [ ] Add tests for remaining components (Dashboard, Score, Settings, etc.)
