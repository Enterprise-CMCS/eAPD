import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

console.error = jest.fn();

describe('Error Boundary component', () => {
  test('Error Boundary', () => {
    const ThrowError = () => {
      throw new Error('Test');
    };

    render(
      <ErrorBoundary fallback={<ErrorBoundary />}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('errorboundary')).toBeVisible();
  });
});
