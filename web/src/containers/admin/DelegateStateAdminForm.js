import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import { TextField, Dropdown, Button, ChoiceList } from '@cmsgov/design-system';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop, useUppy } from '@uppy/react';

import axios, { apiUrl } from '../../util/api';
import { twoYears } from '../../util'
import { getCookie } from '../../util/auth';
import { API_COOKIE_NAME } from '../../constants';
import { STATES } from '../../util/states';
import { Xmark, PDFFileBlue } from '../../components/Icons';

const dropdownOptions = STATES.map(item => {
  return {
    label: item.name,
    value: item.id
  } 
});
dropdownOptions.unshift({label: 'Select an Option', value: ''});

const yearChoices = twoYears.map(year => ({
  label: `FFY ${year}`,
  value: year
}));


const DelegateStateAdminForm = () => {
  const history = useHistory();
  
  const [fileName, setFileName] = useState('');
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
  };
  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    const hasFalseValues = Object.values(state).every(element => Boolean(element));
    setIsFormComplete(hasFalseValues);
  }, [state])
  
  const uppy = useUppy(() => {
    const authToken = JSON.parse(getCookie(API_COOKIE_NAME)).accessToken;
    
    return new Uppy({
      meta: { type: 'doc' },
      restrictions: { 
        maxNumberOfFiles: 1, 
        allowedFileTypes: ['.doc', '.docx', '.pdf'] 
      },
      autoProceed: true
    }).use(XHRUpload, {
      endpoint: `${apiUrl}/auth/certifications/files`,
      formData: true,
      fieldName: 'file',
      headers: {
        authorization: `Bearer ${authToken}`
      }
    });
  });
  
  uppy.on('complete', (result) => {
    uppy.reset();
    setFileName(result.successful[0].name);
    
    dispatch({type: 'update', field: 'fileUrl', payload: `${apiUrl}${result.successful[0].response.body.url}` });
  });
  
  const hideUploadedFileLink = () => {
    uppy.reset();
    setFileName('');
  };
  
  const handleFormSubmit = async () => {
    const response = await axios
      .post('/auth/certifications', state)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        return error;
      });
    if (response === 'OK') {
      history.push('/')
    };
  };
  
  return (
    <main id="start-main-content" className="ds-l-container ds-u-margin-bottom--5">
      <h1>Delegated State Administrator</h1>
      <hr className="custom-hr ds-u-margin-y--3" />
      <span className="ds-u-font-weight--bold">*All fields are required</span>
      <form>
        <ChoiceList
          choices={yearChoices}
          onChange={ (e) => dispatch({type: 'update', field: 'ffy', payload: e.target.value }) }
          label="Period of Delegated Authority"
          name="ffy_choice"
          type="radio"
        />    
        <TextField
          hint="Cannot be a contractor"
          label="Name of State employee to be delegated as eAPD State Adminstrator"
          name="state-employee-name"
          onChange={ (e) => dispatch({type: 'update', field: 'name', payload: e.target.value }) }
          value={state.name}
        />
        <Dropdown
          className="ds-u-margin-top--2"
          options={dropdownOptions}
          defaultValue=""
          label="State"
          labelClassName="ds-u-margin-top--0"
          name="state-dropdown"
          onChange={ (e) => dispatch({type: 'update', field: 'state', payload: e.target.value }) }
        />
        <TextField
          label="State employee email address"
          name="state-employee-email"
          onChange={ (e) => dispatch({type: 'update', field: 'email', payload: e.target.value }) }
          value={state.email}
        />
        <TextField
          label="State employee phone number"
          name="state-employee-phone"
          onChange={ (e) => dispatch({type: 'update', field: 'phone', payload: e.target.value }) }
          value={state.phone}
        />
        <hr className="custom-hr ds-u-margin-y--3" />
        <label className="ds-c-label ds-u-measure--wide" htmlFor="file-input">
          Upload the State Administrator Delegation of Authority letter below.
          <span className="ds-c-field__hint ds-u-padding-y--1">Accepted files: .doc and.pdf only</span>
        </label>
        {fileName && (
          <div className="ds-u-display--flex ds-u-align-items--center ds-u-justify--space-between">
            <PDFFileBlue />
            <a className="ds-u-margin-x--1" href={`${state.fileUrl}`}>{fileName}</a>
            <button type="button" className="ds-u-fill--transparent ds-u-border--0 cursor-pointer" onClick={hideUploadedFileLink}>
              <div className="ds-u-visibility--screen-reader">Remove selected file</div>
              <Xmark />
            </button>
          </div>
        )}
        <div className="ds-u-margin-bottom--4 ds-u-margin-top--2">
          <DragDrop
            id="file-input"
            width="490px"
            height="90px"
            uppy={uppy}
            locale={{
              strings: {
                dropHereOr: 'Drag files here or %{browse}',
                browse: 'choose from folder',
              },
            }}
          />
        </div>
        <div className="ds-u-padding-top--4">
          <Button className="ds-u-margin-right--2" onClick={() => history.push('/')}>Cancel</Button>
          <Button variation="primary" onClick={handleFormSubmit} disabled={!isFormComplete}>Add state admin letter</Button>
        </div>
      </form>
    </main>
  )
};

export default DelegateStateAdminForm;
