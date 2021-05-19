import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

import { Autocomplete, Badge, TextField } from '@cmsgov/design-system';

import { STATES } from '../../util/states';

import { createAccessRequest } from '../../actions/auth';

const ManageAccount = ({
  currentAffiliations, 
  createAccessRequest: createAccessRequestAction
}) => {

  const existingAffiliations = currentAffiliations.map(element => { 
    const stateDetails = STATES.find(item => item.id === element.state_id)
    return { id: element.state_id, name: stateDetails.name, disabled: true } 
  });
  
  const availableStates = STATES.filter( item => {
    return !existingAffiliations.find(affiliation => {
      return affiliation.id === item.id;
   });
  });

  const initialState = {
    fullStateList: availableStates,
    filteredStates: availableStates,
    selectedStates: [],
    inputValue: ''
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'filter':
        return {
          ...state,
          filteredStates: state.fullStateList.filter(el => el.name.toLowerCase().startsWith(action.payload.toLowerCase())),
          inputValue: action.payload
        }
      case 'addSelectedState':
        return {
          selectedStates: [...state.selectedStates, action.payload],
          fullStateList: state.fullStateList.filter(item => item.id !== action.payload.id),
          filteredStates: state.fullStateList.filter(item => item.id !== action.payload.id),
          inputValue: ''
        }
      case 'removeSelectedState':
        return {
          ...state,
          fullStateList: [...state.fullStateList, STATES.find(item => item.id === action.payload)].sort( (a, b) => a.name.localeCompare(b.name) ),
          selectedStates: state.selectedStates.filter(item => item.id !== action.payload ),
          inputValue: ''
        }
      default:
        throw new Error();
    }
  }
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnChange = selection => {
    // onChange can be triggered by hitting escape which will 
    // pass a null value and make the subsequent actions fail
    if(selection === null) {
      return;
    }  
    dispatch({type: 'addSelectedState', payload: selection})
  };
  
  const handleRemoveItem = element => {
    dispatch({type: 'removeSelectedState', payload: element.target.dataset.id});
  };
  
  const handleInputChange = query => {
    dispatch({type: 'filter', payload: query})
  }

  const handleSubmit = e => {
    e.preventDefault();
    createAccessRequestAction(state.selectedStates);
  };

  return (
    <div className="site-body ds-l-container">
      <div class="ds-l-row card">
        <main id="start-main-content">
          <div className="ds-u-padding-y--3">
            <h2>Manage Account</h2>
            <div className="ds-u-margin-bottom--4">
              <p>Current Affiliations. Including Requests</p>
              {existingAffiliations.map(el => {
                  return (
                    <Badge className="ds-u-margin-bottom--1" key={el.id}>
                      {el.name} {' '} 
                      <button className="eapd-badge-remove" type="button" data-id={el.id} onClick={handleRemoveItem} disabled>
                        <span className="ds-u-visibility--screen-reader">Remove {el.name}</span>
                      </button>
                    </Badge>     
                  )
                })}
              <label
                htmlFor="state-selection"
                className="ds-c-label ds-u-margin-bottom--1 ds-u-font-weight--normal"
              >
                Request New Affiliations
              </label>
  
              <Autocomplete
                items={state.filteredStates}
                onChange={handleOnChange}
                onInputValueChange={handleInputChange}
                clearSearchButton={false}
                inputValue={state.inputValue}
                id='state-selection'
              >
                {state.selectedStates.map(el => {
                  return (
                    <Badge className="ds-u-margin-bottom--1" key={el.id} variation={el.disabled ? "" : "info"}>
                      {el.name} {' '} 
                      <button className="eapd-badge-remove" type="button" data-id={el.id} onClick={handleRemoveItem} disabled={el.disabled}>
                        <span className="ds-u-visibility--screen-reader">Remove {el.name}</span>
                      </button>
                    </Badge>     
                  )
                })}
                <TextField
                  label="Select your State Affiliation."
                  placeholder="Search state here"
                  className="ds-u-margin-top--2"
                  labelClassName="ds-u-visibility--screen-reader"
                  name="select-states-field"
                />
                <img className="eapd-autocomplete__search-icon" src="/static/icons/search.svg" alt="Search icon"/>
              </Autocomplete>
              <button className="ds-c-button ds-c-button--primary" type="button" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

ManageAccount.propTypes = {
  currentAffiliations: PropTypes.array.isRequired,
  createAccessRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createAccessRequest
};

const mapStateToProps = state => ({
  currentAffiliations: state.user.data.affiliations,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);

export { ManageAccount as plain, mapStateToProps, mapDispatchToProps };