import PropTypes from 'prop-types';
import React, { useReducer, Fragment } from 'react';

import { connect } from 'react-redux';

import { Autocomplete, Badge, TextField } from '@cmsgov/design-system';
import AuthenticationForm from '../components/AuthenticationForm';

import { STATES } from '../util/states';

const StateAccessRequest = ({ 
  saveAction, 
  errorMessage, 
  fetching, 
  currentAffiliations
}) => {
  // Todo: Exclude revoked/denied states?
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
        throw new Error("Unrecognized action provided to StateAccessRequest reducer hook");
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
    saveAction(state.selectedStates);
  };

  const cardTitle = existingAffiliations.length > 0 ? "Manage Account" : "Verify Your Identity"

  const UserExistingAffiliations = () => {
    return (
      <Fragment>
        <p className="ds-u-margin-bottom--0">Current Affiliations</p>
        <p className="ds-u-margin-top--0 ds-u-font-size--small">This list includes all states you are currently affiliated with. Including requests and states you are denied/revoked access to. To make updates to these affiliations, reach out to your State Administrator.</p>
        {existingAffiliations.map(el => {
          return (
            <Badge className="ds-u-margin-bottom--1" key={el.id}>
              {el.name}
            </Badge>     
          )
        })}
      </Fragment>
    )
  };

  return (
    <div id="start-main-content">
      <AuthenticationForm
        id="state-access-request-form"
        title={cardTitle}
        legend={cardTitle}
        cancelable={false}
        className="ds-u-margin-top--7"
        canSubmit={(state.selectedStates.length > 0)}
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Submit', 'Submitting']}
        onSave={handleSubmit}
      >
        <div className="ds-u-margin-bottom--4">

          {existingAffiliations.length > 0 && (
            <UserExistingAffiliations />
          )}

          <label
            htmlFor="state-selection"
            className="ds-c-label ds-u-margin-bottom--1 ds-u-font-weight--normal"
          >
            Select your State Affiliation.
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
                <Badge className="ds-u-margin-bottom--1" key={el.id} variation="info">
                  {el.name} {' '} 
                  <button className="eapd-badge-remove" type="button" data-id={el.id} onClick={handleRemoveItem}>
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
        </div>
      </AuthenticationForm>
    </div>
  );
};

StateAccessRequest.propTypes = {
  currentAffiliations: PropTypes.array,
  saveAction: PropTypes.func.isRequired,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  fetching: PropTypes.bool.isRequired,
};

StateAccessRequest.defaultProps = {
  errorMessage: false,
  currentAffiliations: []
};

const mapStateToProps = state => ({
  currentAffiliations: state.user.data.affiliations,
});

export default connect(mapStateToProps)(StateAccessRequest);;

export { StateAccessRequest as plain, mapStateToProps };