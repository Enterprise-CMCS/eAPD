import React from 'react';
import { renderWithConnection, fireEvent } from 'apd-testing-library';
import StateAdmin from './StateAdmin';

let props;
let renderUtils;
describe('<StateAdmin />', () => {
  beforeEach(() => {
    props = {
    };
    renderUtils = renderWithConnection(<StateAdmin {...props} />);
  });

  test('header renders', () => {
    const { getByText } = renderUtils;
    expect(
      getByText(
        'undefined eAPD State Administrator Portal'
      )
    ).toBeTruthy();
  });
});
