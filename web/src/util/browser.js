import { detect } from 'detect-browser';

const browser = detect() || {};
if (browser && browser.version) {
  // We're only interested in major versions, not all the minor ones.
  browser.version = Number.parseInt(browser.version.split('.').shift(), 10);
}

// Green support is for browsers where we we intend all functionality to
// work as well as all visual and style features to be correct.
const browserIsGreen =
  // First Chrome version of 2019
  (browser.name === 'chrome' && browser.version >= 72) ||
  // Most recent Firefox extended support release as of October 2019.
  (browser.name === 'firefox' && browser.version >= 68) ||
  // Most recent major version of Edge. This may need to be updated sometime
  // after the Chromium build of Edge is released.
  (browser.name === 'edge' && browser.version >= 44);

// Yellow support is for browsers we think should support all the basic
// functionality of the app, though more advanced features and some visual
// styles may be broken. Our yellow-level browsers are Safari and IE11.
const browserIsYellow =
  browser.name === 'safari' ||
  (browser.name === 'ie' && browser.version === 11);

// Red support is for browsers we don't support at all.
const browserIsRed = !browserIsGreen && !browserIsYellow;

export { browserIsGreen, browserIsYellow, browserIsRed };
