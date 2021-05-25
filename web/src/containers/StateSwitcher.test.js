import React from 'react'

import { render } from '@testing-library/react';

import StateSwitcher from './StateSwitcher';

test('loads and displays value', async () => {
  const screen = render(<StateSwitcher value="big yeps" />);

  expect(screen.getByRole('heading')).toHaveTextContent('big yeps');
})