import React from 'react';
import { renderWithConnection, axe } from 'apd-testing-library';
import LoginGroupError from './LoginGroupError';

let props;
let renderUtils;

describe('<LoginGroupError />', () => {
  beforeEach(() => {
    props = {
      onCancel: jest.fn()
    };
    renderUtils = renderWithConnection(<LoginGroupError {...props} />);
  });

  it('should not fail any accessibility tests', async () => {
    const { container } = renderUtils;
    expect(await axe(container)).toHaveNoViolations();
  });

  test('title renders', () => {
    const { getByText } = renderUtils;
    expect(getByText(/Job Code Missing/)).toBeTruthy();
  });

  test('contact message renders', () => {
    const { getByText } = renderUtils;
    expect(
      getByText(
        /You don’t have the correct job code to access the eAPD system./
      )
    ).toBeTruthy();
  });

  test('cancel button renders', () => {
    const { getByRole } = renderUtils;
    expect(getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });
});
