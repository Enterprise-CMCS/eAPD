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

import { getIsAdmin, getUserStateOrTerritory } from '../reducers/user.selector';

const ApdApplication = ({
  apdSelected,
  isAdmin,
  place,
  apdId,
  setApdToSelectOnLoad: dispatchSelectApdOnLoad
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
      eAPDIdHash: apdId
    }
  });

  return (
    <div className="site-body ds-l-container">
      <div className="ds-u-margin--0">
        <Sidebar place={place} />
        <main id="start-main-content" className="site-main">
          <UnexpectedError />
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
  place: PropTypes.object.isRequired,
  apdId: PropTypes.string,
  setApdToSelectOnLoad: PropTypes.func.isRequired
};

ApdApplication.defaultProps = {
  apdId: null
};

const mapStateToProps = state => ({
  apdSelected: getIsAnAPDSelected(state),
  isAdmin: getIsAdmin(state),
  place: getUserStateOrTerritory(state),
  apdId: getAPDId(state)
});

const mapDispatchToProps = { setApdToSelectOnLoad };

export default connect(mapStateToProps, mapDispatchToProps)(ApdApplication);

export { ApdApplication as plain, mapStateToProps, mapDispatchToProps };
