/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Dropdown, Button } from '@cmsgov/design-system';
import { useFlags } from 'launchdarkly-react-client-sdk';

import axios from '../../../util/api';
import { STATES } from '../../../util/states';

const MatchStateAdminDialog = ({ certification, hideModal }) => {
  const { supportStateAvailable } = useFlags();

  const [stateAffiliations, setStateAffiliations] = useState([]);
  const [selectedAffiliation, setSelectedAffiliation] = useState({});

  const availableStates = useMemo(() => {
    const tempStates = [...STATES];
    if (supportStateAvailable) {
      tempStates.push({ id: 'na', name: 'New Apdland' });
    }
    return tempStates;
  }, [supportStateAvailable]);

  useEffect(
    () => {
      (async () => {
        const state = certification.state.toLowerCase();

        const affiliations = await axios.get(`/states/${state}/affiliations`);
        setStateAffiliations(affiliations.data);
        /* Compare the certification email/name to the affiliations and make 
          it the default one selected in the dropdown */
        const match = affiliations.data.find(affiliation => {
          return (
            affiliation.email === certification.email ||
            affiliation.displayName === certification.name
          );
        });
        setSelectedAffiliation(match);
      })();
    },
    // we want this to run on load so we don't need any thing
    // in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleUserSelect = event => {
    const userInfo = stateAffiliations.find(
      affiliation => Number(affiliation.id) === Number(event.target.value)
    );
    setSelectedAffiliation(userInfo);
  };

  const handleSubmit = async () => {
    await axios.put('/auth/certifications', {
      certificationId: certification.id,
      certificationFfy: certification.ffy,
      affiliationId: selectedAffiliation.id,
      stateId: selectedAffiliation.stateId
    });
    hideModal();
  };

  const stateName =
    availableStates.find(
      state => state.id === certification.state.toLowerCase()
    )?.name || '';

  const dropdownOptions = stateAffiliations.map(item => {
    return {
      label: item.displayName,
      value: item.id
    };
  });

  return (
    <Dialog
      onExit={hideModal}
      heading="Match State Admin Letter to User"
      className="ds-u-left-border-warning"
      size="full"
      actionsClassName="ds-u-display--flex ds-u-justify-content--end ds-u-align-items--center"
      actions={[
        <Button variation="transparent" onClick={hideModal} key="action2">
          Cancel
        </Button>,
        <Button onClick={handleSubmit} key="action1" variation="primary">
          Match and Approve Access
        </Button>
      ]}
    >
      <h3>All {stateName} Users</h3>
      <hr />
      <Dropdown
        options={dropdownOptions}
        size="medium"
        label="Select User"
        name="selectedPermission"
        onChange={handleUserSelect}
        value={selectedAffiliation.id}
      />
      <div className="ds-l-row ds-u-padding-y--3">
        <div className="ds-l-col">
          <h4>EUA User Account</h4>
          <div className="ds-u-border--2 ds-u-padding--2">
            <ul
              className="ds-c-list ds-c-list--bare"
              aria-labelledby="unstyled-list-id"
            >
              <li>
                <strong>{selectedAffiliation.displayName}</strong>
              </li>
              <li>
                <strong>Email:</strong> <span>{selectedAffiliation.email}</span>
              </li>
              <li>
                <strong>State:</strong>{' '}
                <span>
                  {selectedAffiliation.stateId
                    ? selectedAffiliation.stateId.toUpperCase()
                    : ''}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="ds-l-col">
          <h4>State Admin Letter</h4>
          <div className="ds-u-border--2 ds-u-padding--2">
            <ul
              className="ds-c-list ds-c-list--bare"
              aria-labelledby="unstyled-list-id"
            >
              <li>
                <strong>{certification.name}</strong>
              </li>
              <li>
                <strong>Email:</strong> <span>{certification.email}</span>
              </li>
              <li>
                <strong>State:</strong> <span>{certification.state}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

MatchStateAdminDialog.propTypes = {
  certification: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default MatchStateAdminDialog;
