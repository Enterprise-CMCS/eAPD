import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import { setApdToSelectOnLoad } from '../actions/app';

import ApdPageRoutes from './ApdPageRoutes';

import {
  getAPDCreation,
  getAPDName,
  getAPDYearRange,
  getIsAnAPDSelected
} from '../reducers/apd';

import { getIsAdmin, getUserStateOrTerritory } from '../reducers/user.selector';

const ApdApplication = ({
  apdCreated,
  apdName,
  apdSelected,
  isAdmin,
  place,
  setApdToSelectOnLoad: dispatchSelectApdOnLoad,
  year
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
        <div id="start-main-content" className="site-main ds-u-padding-top--2">
          <ApdPageRoutes
            apdCreated={apdCreated}
            apdName={apdName}
            year={year}
          />
        </div>
      </div>
    </div>
  );
};

ApdApplication.propTypes = {
  apdCreated: PropTypes.string.isRequired,
  apdName: PropTypes.string,
  apdSelected: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  setApdToSelectOnLoad: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired
};

ApdApplication.defaultProps = { apdName: '' };

const mapStateToProps = state => ({
  apdCreated: getAPDCreation(state),
  apdName: getAPDName(state),
  apdSelected: getIsAnAPDSelected(state),
  isAdmin: getIsAdmin(state),
  place: getUserStateOrTerritory(state),
  year: getAPDYearRange(state)
});

const mapDispatchToProps = { setApdToSelectOnLoad };

export default connect(mapStateToProps, mapDispatchToProps)(ApdApplication);

export { ApdApplication as plain, mapStateToProps, mapDispatchToProps };
