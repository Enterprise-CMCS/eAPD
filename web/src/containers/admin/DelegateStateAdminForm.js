import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import { TextField, Dropdown, Button } from '@cmsgov/design-system';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop, useUppy } from '@uppy/react';

import axios, { apiUrl } from '../../util/api';
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

const DelegateStateAdminForm = () => {
  const history = useHistory();
  const [showAddedFile, setShowAddedFile] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  
  const initialState = {
    name: '',
    email: '',
    phone: '',
    state: '',
    certifiedByName: '',
    certifiedByTitle: '',
    certifiedByEmail: '',
    certifiedBySignature: '',
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
          'Unrecognized action provided to DelegateStateAdminForm reducer hook'
        );
    }
  };
  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    const hasFalseValues = Object.values(state).every(element => Boolean(element));
    console.log("checking..", hasFalseValues);
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
    
    setShowAddedFile(true);
    setFileName(result.successful[0].name);
    
    dispatch({type: 'update', field: 'fileUrl', payload: `${apiUrl}${result.successful[0].response.body.url}` });
  });
  
  const hideUploadedFileLink = () => {
    uppy.reset();
    setShowAddedFile(false);
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
    } else {
      console.log("response failed", response);
    }
  };
  
  return (
    <main id="start-main-content" className="ds-l-container ds-u-margin-bottom--5">
      <h1>Delegated State Administrator</h1>
      <p className="ds-u-measure--wide ds-u-padding-bottom--4 ds-u-border-bottom--1">Upload the State Administrator Delegation of Authority letter and information to assign a Delegated State Administrator. Once this page is saved, if a matching user exists in the eAPD system, you will be able to view the match and complete the Delegated State Administrator approval process. If a matching user does not exist, the Delegated State Admin will need to sign up for an eAPD account before they can be approved.</p>
      <form>
        <label className="ds-c-label ds-u-measure--wide" htmlFor="file-input">
          Upload the State Administrator Delegation of Authority letter below.
          <span className="ds-c-field__hint ds-u-padding-y--1">Accepted files: .doc and.pdf only</span>
        </label>
        {showAddedFile && (
          <div className="ds-u-display--flex ds-u-align-items--center ds-u-justify--space-between">
            <PDFFileBlue />
            <a className="ds-u-margin-x--1" download={`${state.fileUrl}`}>{fileName}</a>
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
        <span className="ds-u-font-weight--bold">*All fields are required</span>
        <TextField
          hint="Cannot be a contractor"
          label="Name of State employee to be delegated as eAPD State Adminstrator"
          name="name"
          onChange={ (e) => dispatch({type: 'update', field: 'name', payload: e.target.value }) }
          value={state.name}
        />
        <Dropdown
          className="ds-u-margin-top--2"
          options={dropdownOptions}
          defaultValue=""
          label="State"
          labelClassName="ds-u-margin-top--0"
          name="dropdown_field"
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
        <h3 className="ds-u-padding-top--4 ds-u-margin-top--4 ds-u-border-top--1">Delegating Authority</h3>
        <TextField
          label="Name of the person who completed the delegation letter"
          name="certified-by-name"
          onChange={ (e) => dispatch({type: 'update', field: 'certifiedByName', payload: e.target.value }) }
          value={state.certifiedByName}
        />
        <TextField
          label="Title of the person who completed the delegation letter"
          name="certified-by-title"
          onChange={ (e) => dispatch({type: 'update', field: 'certifiedByTitle', payload: e.target.value }) }
          value={state.certifiedByTitle}
        />
        <TextField
          label="Email Address of the person who completed the delegation letter"
          name="certified-by-email"
          onChange={ (e) => dispatch({type: 'update', field: 'certifiedByEmail', payload: e.target.value }) }
          value={state.certifiedByEmail}
        />
        <TextField
          label="Signature (Printed Name on the delegation letter) "
          name="certified-by-signature"
          onChange={ (e) => dispatch({type: 'update', field: 'certifiedBySignature', payload: e.target.value }) }
          value={state.certifiedBySignature}
        />
        <div className="ds-u-padding-top--4">
          <Button className="ds-u-margin-right--2" onClick={history.goBack}>Cancel</Button>
          <Button variation="primary" onClick={handleFormSubmit} disabled={isFormComplete ? false : true}>Add State Admin</Button>
        </div>
      </form>
    </main>
  )
}

export default DelegateStateAdminForm;
