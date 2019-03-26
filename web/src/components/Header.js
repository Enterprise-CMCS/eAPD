import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { t } from '../i18n';

const Header = ({props}) => {
  return (
    <header className="clearfix px2 py1 bg-white">
      <div className="left">
        <Link to="/" className="btn px0 bold caps">
          {t('titleBasic')}
        </Link>
      </div>
    </header>
  );
}

export default Header;
