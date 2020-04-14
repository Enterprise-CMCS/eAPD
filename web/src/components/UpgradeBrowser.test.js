import React from 'react';
import { shallow } from 'enzyme';

describe('browser upgrade alert component', () => {
  beforeEach(() => {
    // We need to reset the required modules at the start of each test because
    // the UpgradeBrowser reads the browserIsYellow value when it is first
    // loaded, not live at runtime. Doing it this way, we can set the value
    // we want and then load the UpgradeBrowser module to get the right
    // behavior.
    jest.resetModules();
  });

  it('does not render if the browser is not "yellow"', () => {
    jest.mock('../util/browser', () => ({
      browserIsYellow: false
    }));
    const UpgradeBrowser = require('./UpgradeBrowser').default; // eslint-disable-line global-require

    expect(shallow(<UpgradeBrowser />)).toMatchSnapshot();
  });

  it('renders as expected for "yellow" browsers', () => {
    jest.mock('../util/browser', () => ({
      browserIsYellow: true
    }));
    const UpgradeBrowser = require('./UpgradeBrowser').default; // eslint-disable-line global-require

    expect(shallow(<UpgradeBrowser />)).toMatchSnapshot();
  });
});
