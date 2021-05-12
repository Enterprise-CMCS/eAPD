import React from 'react';
import { render, fireEvent, axe } from 'apd-testing-library';
import StateAccessRequestConfirmation from './StateAccessRequestConfirmation';

const defaultProps = {
  action: jest.fn()
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  render(<StateAccessRequestConfirmation {...defaultProps} {...props} />);

describe('<StateAccessRequestConfirmation />', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('displays the confirmation message', () => {
    const { getByText } = setup();
    expect(
      getByText(
        /An administrator will verify your affiliation and credentials./i
      )
    ).toBeTruthy();
  });

  it('handles clicking the ok button', () => {
    const { getByRole } = setup();
    fireEvent.click(getByRole('button', { name: 'Ok' }));
    expect(defaultProps.action).toHaveBeenCalled();
  });
});
