import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  useParams as actualUseParams,
  useHistory as actualUseHistory
} from 'react-router-dom';
import TagManager from 'react-gtm-module';

import Sidebar from './Sidebar';
import UnexpectedError from './UnexpectedError';
import { setApdToSelectOnLoad, selectApd } from '../actions/app';

import ApdPageRoutes from './ApdPageRoutes';
import Loading from '../components/Loading';

import { getAPDId } from '../reducers/apd';

import { getIsAdmin, getUserStateOrTerritory } from '../reducers/user.selector';

const ApdApplication = ({
  isAdmin,
  place,
  apdId,
  selectApd: dispatchSelectApd,
  setApdToSelectOnLoad: dispatchSelectApdOnLoad,
  userRole,
  useParams,
  useHistory
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const paramApdId = +useParams().apdId;
  const history = useHistory();

  useEffect(() => {
    if (!paramApdId && !apdId) {
      dispatchSelectApdOnLoad('/apd');
      history.push('/');
    } else if (apdId && !paramApdId) {
      history.push(`/apd/${apdId}`);
    } else if (paramApdId && (!apdId || apdId !== paramApdId)) {
      setIsLoading(true);
      dispatchSelectApd(paramApdId, `/apd/${paramApdId}`);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (apdId) {
      setIsLoading(false);
    }
  }, [apdId]);

  if (isAdmin) {
    return <Redirect to="/" />;
  }
  if (isLoading || !apdId) {
    return (
      <div id="start-main-content">
        <Loading>Loading your APD</Loading>
      </div>
    );
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
          <UnexpectedError />
          <div className="ds-u-padding-top--2">
            <ApdPageRoutes apdId={paramApdId} />
          </div>
        </main>
      </div>
    </div>
  );
};

ApdApplication.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  apdId: PropTypes.number,
  selectApd: PropTypes.func.isRequired,
  setApdToSelectOnLoad: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  useParams: PropTypes.func,
  useHistory: PropTypes.func
};

ApdApplication.defaultProps = {
  apdId: null,
  useParams: actualUseParams,
  useHistory: actualUseHistory
};

const mapStateToProps = state => ({
  isAdmin: getIsAdmin(state),
  place: getUserStateOrTerritory(state),
  apdId: getAPDId(state),
  userRole: state.user.data.role || 'Pending Role'
});

const mapDispatchToProps = { setApdToSelectOnLoad, selectApd };

export default connect(mapStateToProps, mapDispatchToProps)(ApdApplication);

export { ApdApplication as plain, mapStateToProps, mapDispatchToProps };
