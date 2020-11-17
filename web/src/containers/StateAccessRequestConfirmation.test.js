import React from 'react';
import { render, fireEvent } from 'apd-testing-library';
import StateAccessRequestConfirmation from './StateAccessRequestConfirmation';

let props;
let renderUtils;
describe('<StateAccessRequestConfirmation />', () => {
  beforeEach(() => {
    props = {
      action: jest.fn()
    };
    renderUtils = render(<StateAccessRequestConfirmation {...props} />);
  });

  it('displays the confirmation message', () => {
    const { getByText } = renderUtils;
    expect(
      getByText(
        /The State Administrator will verify your affiliation and credentials./i
      )
    ).toBeTruthy();
  });

  it('handles clicking the ok button', () => {
    const { getByRole } = renderUtils;
    fireEvent.click(getByRole('button', { name: 'Ok' }));
    expect(props.action).toHaveBeenCalled();
  });
});
