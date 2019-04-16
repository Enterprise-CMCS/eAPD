import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

let cookie = name => {
  const cookieMap = (document.cookie || '').split(';').reduce((c, s) => {
    const bits = s.trim().split('=');
    if (bits.length === 2) {
      return { ...c, [bits[0].trim()]: bits[1].trim() };
    }
    return c;
  }, {});

  cookie = n => cookieMap[n];

  return cookieMap[name];
};

class ConsentBanner extends PureComponent {
  state = { showDetails: false };

  agreeAndContinue = () => {
    const { onAgree } = this.props;
    document.cookie = 'gov.cms.eapd.hasConsented=true;max-age=259200'; // 3 days
    onAgree();
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    const { showDetails } = this.state;

    const hasConsented = cookie('gov.cms.eapd.hasConsented');
    if (hasConsented) {
      this.agreeAndContinue();
      return null;
    }

    return (
      <div className="card--container">
        <div className="ds-l-container">
          <div className="ds-l-row">
            <div className={`ds-l-col--${showDetails ? 2 : 4}`} />
            {showDetails ? (
              <div className="ds-l-col--8 ds-u-fill--white ds-u-padding--3 ds-u-radius">
                <p>
                  This warning banner provides privacy and security notices
                  consistent with applicable federal laws, directives, and other
                  federal guidance for accessing this Government system, which
                  includes (1) this computer network, (2) all computers
                  connected to this network, and (3) all devices and storage
                  media attached to this network or to a computer on this
                  network.
                </p>
                <p>
                  This system is provided for Government authorized use only.
                </p>
                <p>
                  Unauthorized or improper use of this system is prohibited and
                  may result in disciplinary action and/or civil and criminal
                  penalties.
                </p>
                <p>
                  Personal use of social media and networking sites on this
                  system is limited as to not interfere with official work
                  duties and is subject to monitoring.
                </p>
                <p>
                  By using this system, you understand and consent to the
                  following:
                </p>
                <ul>
                  <li>
                    The Government may monitor, record, and audit your system
                    usage, including usage of personal devices and email systems
                    for official duties or to conduct HHS business. Therefore,
                    you have no reasonable expectation of privacy regarding any
                    communication or data transiting or stored on this system.
                    At any time, and for any lawful Government purpose, the
                    government may monitor, intercept, and search and seize any
                    communication or data transiting or stored on this system.
                  </li>
                  <li>
                    Any communication or data transiting or stored on this
                    system may be disclosed or used for any lawful Government
                    purpose. To continue, you must accept the terms and
                    conditions. If you decline, your login will automatically be
                    cancelled.
                  </li>
                </ul>
                <div className="ds-u-text-align--right">
                  <Button variation="primary" onClick={this.toggleDetails}>
                    Hide details
                  </Button>
                </div>
              </div>
            ) : (
              <div className="ds-l-col--4 ds-u-fill--white ds-u-padding--3 ds-u-radius">
                <p>
                  This is a U.S. government service. Your use indicates your
                  consent to monitoring, recording, and no expectation of
                  privacy. Misuse is subject to criminal and civil penalties.{' '}
                  <Button
                    size="small"
                    variation="transparent"
                    onClick={this.toggleDetails}
                  >
                    Read more details
                  </Button>
                </p>
                <div className="ds-u-text-align--center">
                  <Button variation="primary" onClick={this.agreeAndContinue}>
                    Agree and Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ConsentBanner.propTypes = {
  onAgree: PropTypes.func.isRequired
};

export default ConsentBanner;
