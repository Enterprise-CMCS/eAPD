import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import DeleteModal from './DeleteModal';

describe('DeleteModal component', () => {
  const props = {
    objType: 'Foo',
    onCancel: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    render(<DeleteModal {...props} />);
  });

  it('renders correctly', () => {
    screen.getByRole('button', { name: 'Cancel' });
    screen.getByRole('button', { name: `Delete` });
    screen.getByRole('heading', { name: `Delete ${props.objType}?` });
  });
  it('fires the closer when cancel is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(props.onCancel).toHaveBeenCalled();
    expect(props.onDelete).toHaveBeenCalledTimes(0);
  });
  it('fires onDelete when the delete button is clicked', () => {
    fireEvent.click(
      screen.getByRole('button', { name: `Delete` })
    );
    expect(props.onDelete).toHaveBeenCalled();
    expect(props.onCancel).toHaveBeenCalledTimes(0);
  });

  afterEach(() => {
    props.onCancel.mockClear();
    props.onDelete.mockClear();
  });
});
