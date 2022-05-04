import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import DeleteModal from './DeleteModal';

const defaultProps = {
  objType: 'Foo',
  onCancel: jest.fn(),
  onDelete: jest.fn()
};

const setup = (props = {}) =>
  render(<DeleteModal {...defaultProps} {...props} />);

describe('DeleteModal component', () => {
  it('renders correctly', () => {
    setup();
    screen.getByRole('button', { name: 'Cancel' });
    screen.getByRole('button', { name: `Delete` });
    screen.getByRole('heading', { name: `Delete ${defaultProps.objType}?` });
  });
  it('fires the closer when cancel is clicked', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(defaultProps.onCancel).toHaveBeenCalled();
    expect(defaultProps.onDelete).toHaveBeenCalledTimes(0);
  });
  it('fires onDelete when the delete button is clicked', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: `Delete` }));
    expect(defaultProps.onDelete).toHaveBeenCalled();
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(0);
  });

  afterEach(() => {
    defaultProps.onCancel.mockClear();
    defaultProps.onDelete.mockClear();
  });
});
