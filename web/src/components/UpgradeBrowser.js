import React from 'react';

const browsers = [
  {
    id: 'chrome',
    name: 'Google Chrome',
    link: 'https://www.google.com/chrome/'
  },
  {
    id: 'firefox',
    name: 'Mozilla Firefox',
    link: 'https://www.mozilla.org/en-US/firefox/new/'
  },
  {
    id: 'safari',
    name: 'Apple Safari',
    link: 'https://support.apple.com/en-us/HT204416'
  }
];

const UpgradeBrowser = () => (
  <div className="ds-c-alert ds-c-alert--warn">
    <div className="ds-c-alert__body">
      <h3 className="ds-c-alert__heading">Please upgrade your browser.</h3>
      <p className="ds-c-alert__text ds-u-measure--wide">
        It looks like you may be using an out-of-date web browser that we don’t
        support. Please download or upgrade to one of these browsers to use this
        site.
      </p>
      <div className="ds-l-row">
        {browsers.map(({ id, name, link }) => (
          <div key={id} className="ds-col-4">
            <a href={link} className="ds-u-display--block ds-u-text-align--center ds-u-margin--2">
              <img
                src={`/static/img/browsers/${id}.svg`}
                alt={id}
                style={{'width': '60px'}}
                className=""
                />
              <p>{name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default UpgradeBrowser;
