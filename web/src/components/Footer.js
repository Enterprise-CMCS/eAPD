import React from 'react';

const Footer = () => {
  return (
    <footer className="visibility--screen">
      <div className="ds-l-container">
        <div className="ds-l-row">
          <div className="ds-l-md-col--2 ds-l-sm-col--6 footer--logo-container">
            <img
              src="/static/img/medicaid_logo.png"
              alt="Medicaid logo"
              className="medicaid-logo"
            />
          </div>
          <div className="ds-l-md-col--2 ds-l-sm-col--6 footer--logo-container">
            <img
              src="/static/img/macpro_logo_transparent.png"
              alt="MACPro logo"
              className="macpro-logo"
            />
          </div>
          <div className="ds-l-md-col--8 ds-l-sm-col--12 logo-container">
            <img
              src="/static/img/dhhs_logo_black.png"
              alt="Health and Human Services logo"
              className="hhs-logo"
            />
            <p>
              A federal government website managed and paid for by the U.S.
              Centers for Medicare and Medicaid Services and part of the MACPro
              suite.
            </p>
          </div>
        </div>
      </div>
      <div className="footer--banner">
        <div className="ds-l-container">
          <div className="ds-l-row">
            <p className="ds-l-md-col--6">
              Email <a href="mailto:CMS-EAPD@cms.hhs.gov">CMS-EAPD@cms.hhs.gov</a> for
              help or feedback.
            </p>
            <p className="ds-l-md-col--6 ds-u-text-align--right">
              7500 Security Boulevard, Baltimore, MD 21244
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
