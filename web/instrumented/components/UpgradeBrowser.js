import React from 'react';
import PropTypes from 'prop-types';
import { browserIsYellow } from '../util/browser';

const browsers = [
  {
    id: 'chrome',
    name: 'Google Chrome',
    link: 'https://www.google.com/chrome/'
  },
  {
    id: 'edge',
    name: 'Microsoft Edge',
    link: 'https://www.microsoft.com/en-us/edge/'
  },
  {
    id: 'firefox',
    name: 'Mozilla Firefox',
    link: 'https://www.mozilla.org/en-US/firefox/new/'
  }
];

const html = `<div class="ds-c-alert__body">
  <h3 class="ds-c-alert__heading">Please upgrade your browser.</h3>
  <p class="ds-c-alert__text ds-u-measure--wide">
    It looks like you may be using an out-of-date web browser that we don’t
    support. Please download or upgrade to one of these browsers to use the
    Centers for Medicare & Medicaid Services (CMS) eAPD site.
  </p>
  <div class="ds-l-row">
  ${browsers
    .map(
      ({ id, name, link }) =>
        `<div class="ds-col-4">
          <a href="${link}" class="ds-u-display--block ds-u-text-align--center ds-u-margin--2">
            <img
              src=/static/img/browsers/${id}.svg
              alt="${id}"
              style="width: 60px; height: 60px;"
            />
            <p>${name}</p>
          </a>
        </div>`
    )
    .join('')}
  </div>
</div>`;

const UpgradeBrowser = ({ show = browserIsYellow }) => {
  /* eslint-disable react/no-danger */
  return show ? (
    <div
      className="ds-c-alert ds-c-alert--warn"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : null;
};

export default UpgradeBrowser;

UpgradeBrowser.propTypes = {
  show: PropTypes.bool
};

export { html };
