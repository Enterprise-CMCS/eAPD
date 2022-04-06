import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import { TextField, Dropdown, Button, ChoiceList } from '@cmsgov/design-system';

import axios, { apiUrl } from '../../../util/api';
import { twoYears } from '../../../util';
import { STATES } from '../../../util/states';
import NumberField from '../../../components/NumberField';
import DocumentUpload from '../../../components/DocumentUpload';

const dropdownOptions = STATES.map(item => {
  return {
    label: item.name,
    value: item.id
  };
});
dropdownOptions.unshift({ label: 'Select an Option', value: '' });

const yearChoices = twoYears.map(year => ({
  label: `FFY ${year}`,
  value: year
}));

const DelegateStateAdminForm = () => {
  const history = useHistory();
  const [isFormComplete, setIsFormComplete] = useState(false);

  const initialState = {
    ffy: '',
    name: '',
    email: '',
    phone: '',
    state: '',
    fileUrl: ''
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'update':
        return {
          ...state,
          [action.field]: action.payload
        };
      default:
        throw new Error(
          'Unrecognized action type provided to DelegateStateAdminForm reducer'
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const hasFalseValues = Object.values(state).every(element =>
      Boolean(element)
    );
    setIsFormComplete(hasFalseValues);
  }, [state]);

  const handleFileChange = fileUrl => {
    dispatch({ type: 'update', field: 'fileUrl', payload: fileUrl });
  };

  const handleFormSubmit = async () => {
    const response = await axios
      .post('/auth/certifications', state)
      .then(res => {
        return res;
      })
      .catch(error => {
        return error;
      });
    if (response.status === 200) {
      history.push('/');
    }
  };

  return (
    <main
      id="start-main-content"
      className="ds-l-container ds-u-margin-bottom--5"
    >
      <h1>Delegated State Administrator</h1>
      <hr className="custom-hr ds-u-margin-y--3" />
      <span className="ds-u-font-weight--bold">*All fields are required</span>
      <form>
        <ChoiceList
          choices={yearChoices}
          onChange={e =>
            dispatch({ type: 'update', field: 'ffy', payload: e.target.value })
          }
          label="Period of Delegated Authority"
          name="ffy_choice"
          type="radio"
        />
        <TextField
          hint="Cannot be a contractor"
          label="Name of State employee to be delegated as eAPD State Adminstrator"
          name="state-employee-name"
          onChange={e =>
            dispatch({ type: 'update', field: 'name', payload: e.target.value })
          }
          value={state.name}
        />
        <Dropdown
          className="ds-u-margin-top--2"
          options={dropdownOptions}
          defaultValue=""
          label="State"
          labelClassName="ds-u-margin-top--0"
          name="state-dropdown"
          onChange={e =>
            dispatch({
              type: 'update',
              field: 'state',
              payload: e.target.value
            })
          }
        />
        <TextField
          label="State employee email address"
          name="state-employee-email"
          onChange={e =>
            dispatch({
              type: 'update',
              field: 'email',
              payload: e.target.value
            })
          }
          value={state.email}
        />
        <NumberField
          mask="phone"
          label="State employee phone number"
          name="state-employee-phone"
          onChange={e =>
            dispatch({
              type: 'update',
              field: 'phone',
              payload: e.target.value
            })
          }
          value={state.phone}
        />
        <hr className="custom-hr ds-u-margin-y--3" />
        <label className="ds-c-label ds-u-measure--wide" htmlFor="file-input">
          Upload the State Administrator Delegation of Authority letter below.
          <span className="ds-c-field__hint ds-u-padding-y--1">
            Accepted files: .doc, .docx, and .pdf only
          </span>
        </label>
        <DocumentUpload
          endpoint={`${apiUrl}/auth/certifications/files`}
          fileTypes={['.doc', '.docx', '.pdf']}
          handleFileChange={handleFileChange}
        />
        <div className="ds-u-padding-top--4">
          <Button
            className="ds-u-margin-right--2"
            onClick={() => history.push('/')}
          >
            Cancel
          </Button>
          <Button
            variation="primary"
            onClick={handleFormSubmit}
            disabled={!isFormComplete}
          >
            Add State Admin Letter
          </Button>
        </div>
      </form>
    </main>
  );
};

export default DelegateStateAdminForm;
