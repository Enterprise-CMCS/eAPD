import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { updateAccessRequest as actualUpdateAccessRequest } from '../../actions/auth';

import StateAccessRequest from '../StateAccessRequest';
import StateAccessRequestConfirmation from '../StateAccessRequestConfirmation';

const ManageAccount = ({
  currentAffiliations, 
  updateAccessRequest,
  error
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

  // todo: get errorMessage from redux and display it
  return (
    <Fragment>
      {showConfirmation ? 
        <StateAccessRequestConfirmation action={handleCompleteAccessRequest} />
        : <StateAccessRequest
            saveAction={handleCreateAccessRequest}
            fetching={false}
            errorMessage={error}
            currentAffiliations={currentAffiliations}
          />
      }
    </Fragment>
  );
};

ManageAccount.defaultProps = {
  error: null
};

ManageAccount.propTypes = {
  currentAffiliations: PropTypes.array.isRequired,
  updateAccessRequest: PropTypes.func.isRequired,
  error: PropTypes.string
};

const mapDispatchToProps = {
  updateAccessRequest: actualUpdateAccessRequest
};

const mapStateToProps = state => ({
  currentAffiliations: state.user.data.affiliations,
  error: state.auth.error
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);

export { ManageAccount as plain, mapStateToProps, mapDispatchToProps };