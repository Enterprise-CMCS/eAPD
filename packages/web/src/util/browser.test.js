describe('browser support detection util', () => {
  let detect;

  beforeEach(() => {
    jest.resetModules();

    // eslint-disable-next-line global-require, prefer-destructuring
    detect = require('detect-browser').detect;
    jest.mock('detect-browser');
  });

  test('indicates green support for Chrome versions at least 80', () => {
    detect.mockReturnValue({
      name: 'chrome',
      version: '80.32.71'
    });

    // eslint-disable-next-line global-require
    const browser = require('./browser');
    expect(browser.browserIsGreen).toEqual(true);
    expect(browser.browserIsYellow).toEqual(false);
    expect(browser.browserIsRed).toEqual(false);
  });

  test('indicates green support for Firefox versions at least 68', () => {
    detect.mockReturnValue({
      name: 'firefox',
      version: '68.95.28'
    });

    // eslint-disable-next-line global-require
    const browser = require('./browser');
    expect(browser.browserIsGreen).toEqual(true);
    expect(browser.browserIsYellow).toEqual(false);
    expect(browser.browserIsRed).toEqual(false);
  });

  test('indicates green support for Edge versions at least 79', () => {
    detect.mockReturnValue({
      name: 'edge-chromium',
      version: '79.29.93'
    });

    // eslint-disable-next-line global-require
    const browser = require('./browser');
    expect(browser.browserIsGreen).toEqual(true);
    expect(browser.browserIsYellow).toEqual(false);
    expect(browser.browserIsRed).toEqual(false);
  });

  test('indicates yellow support for Safari', () => {
    detect.mockReturnValue({ name: 'safari', version: '13.4.2' });

    // eslint-disable-next-line global-require
    const browser = require('./browser');
    expect(browser.browserIsGreen).toEqual(false);
    expect(browser.browserIsYellow).toEqual(true);
    expect(browser.browserIsRed).toEqual(false);
  });

  test('indicates yellow support for IE 11', () => {
    detect.mockReturnValue({ name: 'ie', version: '11' });

    // eslint-disable-next-line global-require
    const browser = require('./browser');
    expect(browser.browserIsGreen).toEqual(false);
    expect(browser.browserIsYellow).toEqual(false);
    expect(browser.browserIsRed).toEqual(true);
  });

  describe('indicates red for everything else', () => {
    test('indicates red support for Chrome versions prior to 78', () => {
      detect.mockReturnValue({
        name: 'chrome',
        version: '77.32.71'
      });

      // eslint-disable-next-line global-require
      const browser = require('./browser');
      expect(browser.browserIsGreen).toEqual(false);
      expect(browser.browserIsYellow).toEqual(false);
      expect(browser.browserIsRed).toEqual(true);
    });

    test('indicates red support for Firefox versions prior to 68', () => {
      detect.mockReturnValue({
        name: 'firefox',
        version: '67.95.28'
      });

      // eslint-disable-next-line global-require
      const browser = require('./browser');
      expect(browser.browserIsGreen).toEqual(false);
      expect(browser.browserIsYellow).toEqual(false);
      expect(browser.browserIsRed).toEqual(true);
    });

    test('indicates red support for Edge versions prior to 79', () => {
      detect.mockReturnValue({
        name: 'edge',
        version: '78.95.28'
      });

      // eslint-disable-next-line global-require
      const browser = require('./browser');
      expect(browser.browserIsGreen).toEqual(false);
      expect(browser.browserIsYellow).toEqual(false);
      expect(browser.browserIsRed).toEqual(true);
    });

    test('indicates red support for IE versions prior to 11', () => {
      detect.mockReturnValue({
        name: 'ie',
        version: '10'
      });

      // eslint-disable-next-line global-require
      const browser = require('./browser');
      expect(browser.browserIsGreen).toEqual(false);
      expect(browser.browserIsYellow).toEqual(false);
      expect(browser.browserIsRed).toEqual(true);
    });

    test('indicates red support for other browsers', () => {
      detect.mockReturnValue({
        name: 'something else',
        version: '10'
      });

      // eslint-disable-next-line global-require
      const browser = require('./browser');
      expect(browser.browserIsGreen).toEqual(false);
      expect(browser.browserIsYellow).toEqual(false);
      expect(browser.browserIsRed).toEqual(true);
    });
  });
});
