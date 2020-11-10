import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Dropdown } from '@cmsgov/design-system';

import AuthenticationForm from '../components/AuthenticationForm';
import { usStatesDropdownOptions } from '../util/states';

const StateAccessRequest = ({ action, errorMessage, fetching }) => {
  const [selectedStates, setStates] = useState([]);

  const changeStates = ({ target: { value } }) => {
    console.log({ value });
    setStates([value]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    action(selectedStates);
  };

  return (
    <div id="start-main-content">
      <AuthenticationForm
        title="Verify Your Identity"
        legend="Verify Your Identity"
        cancelable
        className="ds-u-margin-top--7"
        canSubmit={!!selectedStates}
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Submit', 'Submitting']}
        onSave={handleSubmit}
      >
        <div className="ds-u-margin-bottom--4">
          <label
            htmlFor="states"
            className="ds-c-label ds-u-margin-y--2 ds-u-font-weight--normal"
          >
            Please select a State Affiliation.
          </label>
          <Dropdown
            label=""
            id="states"
            name="states"
            options={usStatesDropdownOptions}
            size="medium"
            value={selectedStates}
            onChange={changeStates}
          />
        </div>
      </AuthenticationForm>
    </div>
  );
};

StateAccessRequest.propTypes = {
  errorMessage: PropTypes.bool,
  fetching: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired
};

StateAccessRequest.defaultProps = {
  errorMessage: false
};

export default StateAccessRequest;
