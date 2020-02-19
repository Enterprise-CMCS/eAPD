import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

const cookie = name => {
  const cookieMap = (document.cookie || '').split(';').reduce((c, s) => {
    const bits = s.trim().split('=');
    if (bits.length === 2) {
      return { ...c, [bits[0].trim()]: bits[1].trim() };
    }
    return c;
  }, {});

  return cookieMap[name];
};

const ConsentBanner = ({ onAgree }) => {
  const [showDetails, setShowDetails] = useState(false);

  const agreeAndContinue = () => {
    document.cookie = 'gov.cms.eapd.hasConsented=true;max-age=259200'; // 3 days
    onAgree();
  };

  const expandDetails = () => {
    setShowDetails(true);
  };

  const hasConsented = cookie('gov.cms.eapd.hasConsented');
  if (hasConsented) {
    agreeAndContinue();
    return null;
  }

  return (
    <div className="card--container">
      <div className="ds-l-container">
        <div className="ds-l-row card">
          <div className="ds-l-col--1 ds-u-margin-left--auto" />
          <div className="ds-l-col--12 ds-l-sm-col--10 ds-l-lg-col--6">
            <p>
              This is a U.S. government service. Your use indicates your consent
              to monitoring, recording, and no expectation of privacy. Misuse is
              subject to criminal and civil penalties.
              {showDetails ? null : (
                <Button
                  size="small"
                  variation="transparent"
                  onClick={expandDetails}
                >
                  Read more details
                </Button>
              )}
            </p>
            {showDetails ? (
              <Fragment>
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
              </Fragment>
            ) : null}
            <div className="ds-u-text-align--center">
              <Button variation="primary" onClick={agreeAndContinue}>
                Agree and continue
              </Button>
            </div>
          </div>
          <div className="ds-l-col--1 ds-u-margin-right--auto" />
        </div>
      </div>
    </div>
  );
};

ConsentBanner.propTypes = {
  onAgree: PropTypes.func.isRequired
};

export default ConsentBanner;
