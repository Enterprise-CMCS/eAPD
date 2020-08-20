import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import UnexpectedError from './UnexpectedError';
import { setApdToSelectOnLoad } from '../actions/app';

import ApdPageRoutes from './ApdPageRoutes';

import {
  getIsAnAPDSelected
} from '../reducers/apd';

import { getIsAdmin, getUserStateOrTerritory } from '../reducers/user.selector';

const ApdApplication = ({
  apdSelected,
  isAdmin,
  place,
  setApdToSelectOnLoad: dispatchSelectApdOnLoad,
}) => {
  if (isAdmin) {
    return <Redirect to="/" />;
  }

  if (!apdSelected) {
    dispatchSelectApdOnLoad('/apd');
    return <Redirect to="/" />;
  }

  return (
    <div className="site-body ds-l-container">
      <div className="ds-u-margin--0">
        <Sidebar place={place} />
        <div id="start-main-content" className="site-main">
          <UnexpectedError />
          <div className="ds-u-padding-top--2">
            <ApdPageRoutes />
          </div>
        </div>
      </div>
    </div>
  );
};

ApdApplication.propTypes = {
  apdSelected: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  setApdToSelectOnLoad: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  apdSelected: getIsAnAPDSelected(state),
  isAdmin: getIsAdmin(state),
  place: getUserStateOrTerritory(state),
});

const mapDispatchToProps = { setApdToSelectOnLoad };

export default connect(mapStateToProps, mapDispatchToProps)(ApdApplication);

export { ApdApplication as plain, mapStateToProps, mapDispatchToProps };
