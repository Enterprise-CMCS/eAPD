import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { createAccessRequest, completeAccessRequest } from '../../actions/auth';

import StateAccessRequest from '../StateAccessRequest';
import StateAccessRequestConfirmation from '../StateAccessRequestConfirmation';

const ManageAccount = ({
  currentAffiliations, 
  createAccessRequest: createAccessRequestAction
}) => {

  const history = useHistory();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCreateAccessRequest = async states => {
    await createAccessRequestAction(states).then(() => {
      setShowConfirmation(true);
    });
  };

  const handleCompleteAccessRequest = () => {
    completeAccessRequest();
    history.push('/');
  };

  return (
    <div>
      {showConfirmation ? 
        <StateAccessRequestConfirmation action={handleCompleteAccessRequest} />
        : <StateAccessRequest
            saveAction={handleCreateAccessRequest}
            fetching={false}
            errorMessage={null}
            currentAffiliations={currentAffiliations}
          />
      }
    </div>
  );
};

ManageAccount.propTypes = {
  currentAffiliations: PropTypes.array.isRequired,
  createAccessRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createAccessRequest,
  completeAccessRequest
};

const mapStateToProps = state => ({
  currentAffiliations: state.user.data.affiliations,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);

export { ManageAccount as plain, mapStateToProps, mapDispatchToProps };