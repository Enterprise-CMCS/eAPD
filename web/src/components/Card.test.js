import React from 'react';
import { render, screen } from 'apd-testing-library';

import Card from './Card';

const defaultProps = {
  title: 'test'
};

const setup = (props = {}) => {
  return render(
    <Card {...defaultProps} {...props} />
  );
};

describe('card wrapper', () => {
  test('renders correctly with valid data', () => {
    const props = {
      title: 'test',
      body: 'foo',
      width: "20rem"
    }
    setup(props);
    expect(screen.getByText('test')).toBeTruthy();
    expect(screen.getByText('foo')).toBeTruthy();
  });
});
