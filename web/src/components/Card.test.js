import React from 'react';
import { render, screen } from 'apd-testing-library';

import Card from './Card';

const defaultProps = {
  title: 'test'
};

const setup = (props = {}) => {
  return render(
    <Card {...defaultProps} {...props}></Card>
  );
};

describe('card wrapper', () => {
  test('renders card title', () => {
    setup();

    expect(screen.getByText('test')).toBeTruthy();
  });
});
