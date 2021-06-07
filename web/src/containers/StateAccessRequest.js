import PropTypes from 'prop-types';
import React, { useReducer } from 'react';

import { Autocomplete, Badge, TextField } from '@cmsgov/design-system';

import AuthenticationForm from '../components/AuthenticationForm';
import { STATES } from '../util/states';

const StateAccessRequest = ({
  saveAction,
  cancelAction,
  errorMessage,
  fetching
}) => {
  const initialState = {
    fullStateList: STATES,
    filteredStates: STATES,
    selectedStates: [],
    inputValue: ''
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'filter':
        return {
          ...state,
          filteredStates: state.fullStateList.filter(el =>
            el.name.toLowerCase().startsWith(action.payload.toLowerCase())
          ),
          inputValue: action.payload
        };
      case 'addSelectedState':
        return {
          selectedStates: [...state.selectedStates, action.payload],
          fullStateList: state.fullStateList.filter(
            item => item.id !== action.payload.id
          ),
          filteredStates: state.fullStateList.filter(
            item => item.id !== action.payload.id
          ),
          inputValue: ''
        };
      case 'removeSelectedState':
        return {
          ...state,
          fullStateList: [
            ...state.fullStateList,
            STATES.find(item => item.id === action.payload)
          ].sort((a, b) => a.name.localeCompare(b.name)),
          selectedStates: state.selectedStates.filter(
            item => item.id !== action.payload
          ),
          inputValue: ''
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnChange = selection => {
    // onChange can be triggered by hitting escape which will
    // pass a null value and make the subsequent actions fail
    if (selection === null) {
      return;
    }
    dispatch({ type: 'addSelectedState', payload: selection });
  };

  const handleRemoveItem = element => {
    dispatch({
      type: 'removeSelectedState',
      payload: element.target.dataset.id
    });
  };

  const handleInputChange = query => {
    dispatch({ type: 'filter', payload: query });
  };

  const handleSubmit = e => {
    e.preventDefault();
    saveAction(state.selectedStates);
  };

  const handleCancel = e => {
    e.preventDefault();
    if (cancelAction) cancelAction();
  };

  return (
    <div id="start-main-content">
      <AuthenticationForm
        id="state-access-request-form"
        title="Verify Your Identity"
        legend="Verify Your Identity"
        cancelable
        className="ds-u-margin-top--7"
        canSubmit={state.selectedStates.length > 0}
        error={errorMessage}
        success={null}
        working={fetching}
        primaryButtonText={['Submit', 'Submitting']}
        secondaryButtonText="Back to Login"
        onSave={handleSubmit}
        onCancel={handleCancel}
      >
        <div className="ds-u-margin-bottom--4">
          <p className="ds-c-label ds-u-margin-bottom--1 ds-u-font-weight--normal">
            Select your State Affiliation.
          </p>

          <Autocomplete
            items={state.filteredStates}
            onChange={handleOnChange}
            onInputValueChange={handleInputChange}
            clearSearchButton={false}
            inputValue={state.inputValue}
            id="state-selection"
          >
            {state.selectedStates.map(el => {
              return (
                <Badge
                  className="ds-u-margin-bottom--1"
                  key={el.id}
                  variation="info"
                >
                  {el.name}{' '}
                  <button
                    className="eapd-badge-remove"
                    type="button"
                    data-id={el.id}
                    onClick={handleRemoveItem}
                  >
                    <span className="ds-u-visibility--screen-reader">
                      Remove {el.name}
                    </span>
                  </button>
                </Badge>
              );
            })}
            <TextField
              label="Select your State Affiliation."
              placeholder="Search state here"
              className="ds-u-margin-top--2"
              labelClassName="ds-u-visibility--screen-reader"
              name="select-states-field"
            />
            <img
              className="eapd-autocomplete__search-icon"
              src="/static/icons/search.svg"
              alt="Search icon"
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
  saveAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired
};

StateAccessRequest.defaultProps = {
  errorMessage: false
};

export default StateAccessRequest;
