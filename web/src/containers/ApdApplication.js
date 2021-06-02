import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TagManager from 'react-gtm-module';

import Sidebar from './Sidebar';
import UnexpectedError from './UnexpectedError';
import { setApdToSelectOnLoad } from '../actions/app';

import ApdPageRoutes from './ApdPageRoutes';

import { getIsAnAPDSelected, getAPDId } from '../reducers/apd';

import {
  getIsAdmin,
  getUserStateOrTerritory,
  getCanUserEditAPD
} from '../reducers/user.selector';

const ApdApplication = ({
  apdSelected,
  isAdmin,
  isEditor,
  place,
  apdId,
  setApdToSelectOnLoad: dispatchSelectApdOnLoad,
  userRole
}) => {
  if (isAdmin) {
    return <Redirect to="/" />;
  }

  if (!apdSelected) {
    dispatchSelectApdOnLoad('/apd');
    return <Redirect to="/" />;
  }

  TagManager.dataLayer({
    dataLayer: {
      stateId: place.id,
      eAPDIdHash: apdId,
      userRole
    }
  });

  return (
    <div className="site-body ds-l-container">
      <div className="ds-u-margin--0">
        <Sidebar place={place} />
        <main id="start-main-content" className="site-main">
          {isEditor && <UnexpectedError />}
          <div className="ds-u-padding-top--2">
            <ApdPageRoutes />
          </div>
        </main>
      </div>
    </div>
  );
};

ApdApplication.propTypes = {
  apdSelected: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isEditor: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  apdId: PropTypes.string,
  setApdToSelectOnLoad: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired
};

ApdApplication.defaultProps = {
  apdId: null
};

const mapStateToProps = state => ({
  apdSelected: getIsAnAPDSelected(state),
  isAdmin: getIsAdmin(state),
  isEditor: getCanUserEditAPD(state),
  place: getUserStateOrTerritory(state),
  apdId: getAPDId(state),
  userRole: state.user.data.role || 'Pending Role'
});

const mapDispatchToProps = { setApdToSelectOnLoad };

export default connect(mapStateToProps, mapDispatchToProps)(ApdApplication);

export { ApdApplication as plain, mapStateToProps, mapDispatchToProps };
