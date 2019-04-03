import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="ds-l-container">
        <div className="ds-l-row">
          <div className="ds-l-col--12 logo-container">
            <img
              src="/static/img/dhhs_logo_black.png"
              alt="Health and Human Services logo"
              className="hhs-logo"
            />
            <p>
              A federal government website managed and paid for by the <br/>U.S. Centers for Medicare and Medicaid Services.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
