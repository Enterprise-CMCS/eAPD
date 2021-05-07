import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Autocomplete, Badge, TextField } from '@cmsgov/design-system';

import AuthenticationForm from '../components/AuthenticationForm';
import { STATES } from '../util/states';

const StateAccessRequest = ({ saveAction, errorMessage, fetching }) => {
  // We maintain 4 objects to support the multiple state selection
  // 1. initialStates - full list of states that can be filtered against. as
  // states/items are selected by the user, they are removed from this list
  const [initialStates, setInitialStates] = useState(STATES);

  // 2. filteredStates - list of states that match search query
  const [filteredStates, setFilteredStates] = useState([]);

  // 3. selectedStates - array of chosen states. Used for both form submission
  // and displaying the badges on the page
  const [selectedStates, setSelectedStates] = useState([]);
  
  // 4. queryValue - controlled value for what is displayed in the input field
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = selection => {
    setInputValue('');
    
    // onChange can be triggered by hitting escape so we need to
    // return when that happens if nothing is entered
    if(selection === null) {
      return;
    }

    // add state to selectedStates
    const newSelection = selectedStates;
    newSelection.push(selection);
    setSelectedStates(newSelection);
    
    // remove state from initialState list
    setInitialStates(initialStates.filter(item => item.id !== selection.id));

    // reset filteredStates
    setFilteredStates(initialStates.filter(item => item.id !== selection.id));
  };
  
  const handleRemoveItem = element => {
    setInputValue('');

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

  const handleSubmit = e => {
    e.preventDefault();
    saveAction(selectedStates);
  };

  return (
    <div id="start-main-content">
      <AuthenticationForm
        id="state-access-request-form"
        title="Verify Your Identity"
        legend="Verify Your Identity"
        cancelable={false}
        className="ds-u-margin-top--7"
        canSubmit={(selectedStates.length > 0)}
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Submit', 'Submitting']}
        onSave={handleSubmit}
      >
        <div className="ds-u-margin-bottom--4">
          <label
            htmlFor="state-selection"
            className="ds-c-label ds-u-margin-bottom--1 ds-u-font-weight--normal"
          >
            Select Affiliation(s)
          </label>

          <Autocomplete
            items={filteredStates}
            onChange={handleOnChange}
            onInputValueChange={handleInputChange}
            clearSearchButton={false}
            inputValue={inputValue}
            id='state-selection'
          >

            {/* render a collection of badges here with a button to remove them */}
            {selectedStates.map(el => {
              return (
                <Badge className="ds-u-margin-bottom--1" key={el.id} variation="info">
                  {el.name} {' '} 
                  <button className="eapd-badge-remove" type="button" data-id={el.id} onClick={handleRemoveItem}>
                    <span className="ds-u-visibility--screen-reader">Remove {el.name}</span>
                  </button>
                </Badge>          
              )
            })}

            <TextField
              label="Select Affiliation(s)"
              placeholder="Search state here"
              className="ds-u-margin-top--2"
              labelClassName="ds-u-visibility--screen-reader"
              name="select-states-field"
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
