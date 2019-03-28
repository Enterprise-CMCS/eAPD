import React from 'react';
import { Link } from 'react-router-dom';

import { t } from '../i18n';

const Header = () => {
  return (
    <header className="header__slim">
      <div className="ds-l-container">
        <div className="ds-l-row">
          <div className="ds-l-col">
            <Link to="/" className="site-title">
              {t('titleBasic')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
