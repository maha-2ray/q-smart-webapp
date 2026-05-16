# Test Suite Documentation

## Overview

This project includes comprehensive unit tests for all implemented UI components and features using Jest and React Testing Library.

## Test Files

### Component Tests

#### 1. **Dropdown Component** (`src/components/ui/__tests__/dropdown.test.tsx`)

- ✅ Renders user information correctly
- ✅ Opens/closes dropdown menu on click
- ✅ Handles click-outside to close menu
- ✅ Displays user avatar (image or initial)
- ✅ Handles logout action (clears auth token)
- ✅ Navigation to profile and settings

**Running tests:**

```bash
npm test dropdown.test
```

#### 2. **Department Card Component** (`src/components/ui/__tests__/department-card.test.tsx`)

- ✅ Displays department name and info
- ✅ Shows ticket prefix
- ✅ Displays status badge (open/closed with correct colors)
- ✅ Shows number of people waiting
- ✅ Shows average waiting time
- ✅ Handles click callbacks
- ✅ Proper singular/plural labeling

**Running tests:**

```bash
npm test department-card.test
```

#### 3. **Summary Card Component** (`src/components/ui/__tests__/summary-cards.test.tsx`)

- ✅ Renders title and value
- ✅ Displays trend indicators (up/down/neutral)
- ✅ Shows trend icons with correct colors
- ✅ Handles custom icons
- ✅ Applies proper styling for different trends
- ✅ Handles different value types (number, string)

**Running tests:**

```bash
npm test summary-cards.test
```

#### 4. **Queue Control Component** (`src/pages/queue-operations/components/__tests__/queue-control.test.tsx`)

- ✅ Displays department name and queue stats
- ✅ Shows people waiting count
- ✅ Shows average wait time
- ✅ Renders "Call Next Person" button
- ✅ Handles button click callback
- ✅ Proper gradient styling for stat cards
- ✅ Displays icons for each stat

**Running tests:**

```bash
npm test queue-control.test
```

#### 5. **Currently Serving Component** (`src/pages/queue-operations/components/__tests__/currently-serving.test.tsx`)

- ✅ Displays ticket number in gradient badge
- ✅ Shows ticket holder name
- ✅ Shows phone number
- ✅ Renders three action buttons (Served, Recall, No-Show)
- ✅ Handles click callbacks for each action
- ✅ Proper color coding for buttons
- ✅ Displays icons for each action

**Running tests:**

```bash
npm test currently-serving.test
```

#### 6. **Error Boundary Component** (`src/hooks/__tests__/error-boundary.test.tsx`)

- ✅ Renders children when no error
- ✅ Shows error UI on error occurrence
- ✅ Displays error description
- ✅ Renders "Try Again" button
- ✅ Renders "Go Home" button
- ✅ Proper error styling with alert icon
- ✅ Handles different error types
- ✅ Button functionality (reload page, navigate home)

**Running tests:**

```bash
npm test error-boundary.test
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test:watch
```

### Generate Coverage Report

```bash
npm test:coverage
```

### Run Specific Test File

```bash
npm test -- dropdown.test
```

### Run Tests Matching Pattern

```bash
npm test -- --testNamePattern="renders"
```

## Test Coverage

Current coverage thresholds (configured in `jest.config.cjs`):

- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

To view detailed coverage:

```bash
npm test:coverage
```

This generates a coverage report in the `coverage/` directory.

## Test Setup

### Configuration Files

#### `jest.config.cjs`

Main Jest configuration file:

- TypeScript support via ts-jest
- jsdom test environment for DOM testing
- Module name mapping for `@/` alias
- CSS module mocking
- Coverage thresholds

#### `src/setupTests.ts`

Test environment setup:

- Loads React Testing Library matchers
- Mocks `window.matchMedia` for responsive tests
- Mocks `navigator.clipboard`

## Writing Tests

### Test Structure

All tests follow this pattern:

```typescript
import { render, screen } from '@testing-library/react'
import Component from '@/path/to/component'

describe('Component Name', () => {
  test('should render correctly', () => {
    render(<Component prop="value" />)
    expect(screen.getByText('expected text')).toBeInTheDocument()
  })
})
```

### Best Practices

1. **Use semantic queries**: Prefer `getByRole()`, `getByLabelText()` over `getByTestId()`
2. **Test behavior, not implementation**: Focus on what users see and do
3. **Use `fireEvent` or `userEvent`**: Simulate user interactions
4. **Handle async operations**: Use `waitFor()` and `findBy` queries
5. **Mock external dependencies**: Router, API calls, etc.

### Common Testing Utilities

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Render component
render(<Component />)

// Query methods
screen.getByText('text')
screen.getByRole('button')
screen.getByTestId('id')
screen.queryByText('text') // returns null if not found
screen.findByText('text') // async, waits for element

// Fire events
fireEvent.click(element)
fireEvent.change(input, { target: { value: 'new value' } })

// User events (more realistic)
await userEvent.click(button)
await userEvent.type(input, 'text')

// Wait for async operations
await waitFor(() => {
  expect(screen.getByText('loaded')).toBeInTheDocument()
})
```

## Debugging Tests

### Run Single Test File

```bash
npm test -- dropdown.test --verbose
```

### Pause Tests

Use `test.only()` to run a single test:

```typescript
test.only("specific test", () => {
  // test code
});
```

### Print DOM

```typescript
const { debug } = render(<Component />)
debug()
```

## Continuous Integration

Tests should be run as part of your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Run tests
  run: npm test -- --coverage --watchAll=false
```

## Troubleshooting

### Common Issues

**"Cannot find module" errors**

- Ensure module name mapping in `jest.config.cjs` is correct
- Clear node_modules: `rm -rf node_modules && npm install`

**"ReferenceError: window is not defined"**

- Make sure `testEnvironment: 'jsdom'` is set in jest config
- Add necessary mocks in `setupTests.ts`

**Tests timeout**

- Increase timeout: `jest.setTimeout(10000)`
- Use `waitFor()` with proper timeout: `waitFor(() => {...}, { timeout: 5000 })`

**Snapshot failures**

- Review changes and update snapshots: `npm test -- -u`

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:

1. Write tests alongside the code
2. Ensure all tests pass: `npm test`
3. Maintain coverage above thresholds
4. Update this documentation with new test files

---

**Last Updated**: May 15, 2026
