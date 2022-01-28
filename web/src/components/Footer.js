import React from 'react';

const Footer = () => {
  return (
    <footer className="visibility--screen">
      <div className="ds-l-container">
        <div className="ds-l-row ds-u-display--flex ds-u-justify-content--between ds-u-align-items--center">
          <img
            src="/static/img/dhhs_logo_black.png"
            alt="Health and Human Services logo"
            className="hhs-logo"
            width="80px"
          />
          <img
            src="static/img/cms-logo.png"
            alt="Centers for Medicare & Medicaid Services Logo"
            className="cms-logo"
            width="150px"
          />
          <img
            src="static/img/macpro_logo_transparent.png"
            alt="MACPro logo"
            className="macpro-logo"
            width="100px"
          />
          <img
            src="static/img/eAPDLogoSVG_ICO/SVG/eAPDColVarSVG.svg"
            alt="eAPD logo"
            className="eAPD-logo"
            width="115px"
          />
          <p className="ds-u-measure--narrow">
            A federal government website managed and paid for by the U.S.
            Centers for Medicare and Medicaid Services and part of the MACPro
            suite.
          </p>
        </div>
      </div>
      <div className="footer--banner">
        <div className="ds-l-container">
          <div className="ds-l-row">
            <p className="ds-l-md-col--6">
              Email{' '}
              <a href="mailto:CMS-EAPD@cms.hhs.gov">CMS-EAPD@cms.hhs.gov</a> for
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
