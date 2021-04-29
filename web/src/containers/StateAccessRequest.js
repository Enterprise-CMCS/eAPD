import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Autocomplete, Badge, TextField } from '@cmsgov/design-system';

import Icon, { faTimesCircle } from "../components/Icons";

import AuthenticationForm from '../components/AuthenticationForm';
import { STATES } from '../util/states';

const StateAccessRequest = ({ saveAction, errorMessage, fetching }) => {

  // Ty Note: Need to maintain 4 state objects to suppor the multiple state selection
  // 1. initialStates = full list of states that can be filtered against. will be
  // reduced as items are added to selectedStates
  // 2. filteredStates = list of states that match search query
  // 3. selectedStates = array of chosen states. Used for both form submission and
  // displaying the badges on the page
  // 4. queryValue = what we want to appear in the search box
  const [initialStates, setInitialStates] = useState(STATES);

  const [filteredStates, setFilteredStates] = useState([]);

  const [selectedStates, setSelectedStates] = useState([]);

  const [inputValue, setInputValue] = useState('');


  const handleOnChange = selection => {
    console.log("changeStates fired");

    // set search box to empty
    setInputValue('');

    // add item to selectedStates
    const newSelection = selectedStates;
    newSelection.push(selection);
    setSelectedStates(newSelection);

    // remove state from initialState list
    setInitialStates(initialStates.filter(item => item.id !== selection.id));
  };

  const handleSubmit = e => {
    console.log("handleSubmit fired");
    e.preventDefault();
    saveAction(selectedStates);
  };

  const handleRemoveItem = element => {
    // remove from selectedStates
    const newSelection = selectedStates.filter(item => item.id !== element.target.dataset.id );
    setSelectedStates(newSelection);

    // add back to initialStates list
    const newInitialStates = initialStates;
    const addBackState = STATES.find(item => item.id === element.target.dataset.id);
    newInitialStates.push(addBackState);
    setInitialStates(newInitialStates);
  };

  const handleInputChange = query => {
    setInputValue(query);
    setFilteredStates(initialStates.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1));
  }

  return (
    <div id="start-main-content">
      <AuthenticationForm
        id="state-access-request-form"
        title="Verify Your Identity"
        legend="Verify Your Identity"
        cancelable={false}
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
            Select Affiliation(s).
          </label>

          <Autocomplete
            items={filteredStates}
            onChange={handleOnChange}
            onInputValueChange={handleInputChange}
            clearSearchButton={false}
            inputValue={inputValue}
          >
            {/* render a collection of badges here with a button to remove them */}
            {selectedStates.map(el => {
              return (
                <Badge key={el.id} variation="info">
                  {el.name} {' '} 
                  <button className="remove-item-button" type="button" data-id={el.id} onClick={handleRemoveItem}>
                    <Icon icon={faTimesCircle} />
                  </button>
                </Badge>          
              )
            })}
            <TextField
              hint=""
              label=""
              placeholder="Search state here"
              labelClassName="ds-u-margin-top--2"
              name="select-affiliations-autocomplete"
            />
          </Autocomplete>

        </div>
      </AuthenticationForm>
    </div>
  );
};

StateAccessRequest.propTypes = {
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  fetching: PropTypes.bool.isRequired,
  saveAction: PropTypes.func.isRequired
};

StateAccessRequest.defaultProps = {
  errorMessage: false
};

export default StateAccessRequest;
