import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { updateAccessRequest as actualUpdateAccessRequest } from '../../actions/auth';

import StateAccessRequest from '../StateAccessRequest';
import StateAccessRequestConfirmation from '../StateAccessRequestConfirmation';
import { getIsFedAdmin } from '../../reducers/user.selector';
import { goToDashboard } from '../../actions/app';

const ManageAccount = ({
  currentAffiliations, 
  updateAccessRequest,
  error,
  isAdmin,
  currentUser,
  dashboard
}) => {

  const history = useHistory();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCreateAccessRequest = async states => {
    await updateAccessRequest(states).then(() => {
      setShowConfirmation(true);
    });
  };

  const handleCompleteAccessRequest = () => {
    history.push('/');
  };

  if(error) {
    setShowConfirmation(false);
  }

  const secondaryButtonText = isAdmin
    ? 'Admin Dashboard'
    : `${
      currentUser.state && currentUser.state.id
        ? `${currentUser.state.id.toUpperCase()} `
        : ''
    }APD Home`
  
  return (
    <Fragment>
      {showConfirmation ? 
        <StateAccessRequestConfirmation action={handleCompleteAccessRequest} />
        : <StateAccessRequest
            saveAction={handleCreateAccessRequest}
            fetching={false}
            errorMessage={error}
            currentAffiliations={currentAffiliations}
            secondaryButtonText={secondaryButtonText}
            cancelAction={dashboard}
          />
      }
    </Fragment>
  );
};

ManageAccount.defaultProps = {
  error: null,
  currentUser: null,
};

ManageAccount.propTypes = {
  currentAffiliations: PropTypes.array.isRequired,
  updateAccessRequest: PropTypes.func.isRequired,
  error: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  dashboard: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  updateAccessRequest: actualUpdateAccessRequest,
  dashboard: goToDashboard
};

const mapStateToProps = state => ({
  currentAffiliations: state.user.data.affiliations,
  error: state.auth.error,
  isAdmin: getIsFedAdmin(state),
  currentUser: state.auth.user,

});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);

export { ManageAccount as plain, mapStateToProps, mapDispatchToProps };