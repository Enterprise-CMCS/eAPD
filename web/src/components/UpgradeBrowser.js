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
    id: 'ie',
    name: 'Internet Explorer 11',
    link:
      'https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads'
  },
  {
    id: 'safari',
    name: 'Apple Safari',
    link: 'https://support.apple.com/en-us/HT204416'
  }
];

const UpgradeBrowser = () => (
  <div className="container px2 py3" style={{ maxWidth: 800 }}>
    <h1 className="mb1">Please upgrade your browser.</h1>
    <p>
      It looks like you may be using an out-of-date web browser that we don’t
      support. Please download or upgrade to one of these browsers to use this
      site.
    </p>
    <div className="flex flex-wrap mxn1">
      {browsers.map(({ id, name, link }) => (
        <div key={id} className="col-6 sm-col-3 p1">
          <a href={link} className="p2 block black center bg-white rounded">
            <img
              src={`/static/img/browsers/${id}.svg`}
              alt={id}
              className="mb2 col-9 align-middle"
            />
            <div className="h5 bold truncate">{name}</div>
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default UpgradeBrowser;
