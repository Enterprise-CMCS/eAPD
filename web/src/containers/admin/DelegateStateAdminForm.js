import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { TextField, Dropdown, Button } from '@cmsgov/design-system';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop, useUppy } from '@uppy/react';

import { apiUrl } from '../../util/api';
import { getCookie } from '../../util/auth';
import { API_COOKIE_NAME } from '../../constants';

const authToken = JSON.parse(getCookie(API_COOKIE_NAME)).accessToken;

const dropdownOptions = [
  { label: '- Select an option -', value: '' },
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' },
];

const DelegateStateAdminForm = ({
  
}) => {
  
  const [showAddedFile, setShowAddedFile] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const uppy = useUppy(() => {
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
    console.log("result", result);
    setShowAddedFile(true);
    setFileName(result.successful[0].name);
    
    console.log("result url", result.successful[0].response.body.url);
    {/* I don't _think_ we will want to store the URL in redux but this
        is where we would do that...
        const url = result.successful[0].uploadURL
        store.dispatch({
          type: 'SET_USER_AVATAR_URL',
          payload: { url },
        }) */}
  });
  
  return (
    <main
      id="start-main-content"
      className="ds-l-container ds-u-margin-bottom--5"
    >
      <h1>Delegated State Administrator</h1>
      <p className="ds-u-measure--wide ds-u-padding-bottom--4 ds-u-border-bottom--1">Upload the State Administrator Delegation of Authority letter and information to assign a Delegated State Administrator. Once this page is saved, if a matching user exists in the eAPD system, you will be able to view the match and complete the Delegated State Administrator approval process. If a matching user does not exist, the Delegated State Admin will need to sign up for an eAPD account before they can be approved.</p>
      <label className="ds-c-label ds-u-measure--wide" for="file-input-single">
        Upload the State Administrator Delegation of  Authority letter below.
        <span className="ds-c-field__hint">Accepted files: .doc and.pdf only</span>
      </label>
      {/* Consider splitting this out to its own component? */}
      {showAddedFile && (
        <div className="eapd-file-label">
          {fileName}
        </div>        
      )}
      <div className="ds-u-margin-y--4">
        <DragDrop
          width={"490px"}
          height={"90px"}
          uppy={uppy}
          locale={{
            strings: {
              dropHereOr: 'Drag files here or %{browse}',
              browse: 'choose from folder',
            },
          }}
        />
      </div>
      
      <span>*All fields are required</span>
      <TextField
        hint="Cannot be a contractor"
        label="Name of State employee to be delegated as eAPD State Adminstrator"
        name="name"
      />
      <Dropdown
        options={dropdownOptions}
        defaultValue=""
        label="State"
        labelClassName="ds-u-margin-top--0"
        name="dropdown_field"
        />
      <TextField
        label="State employee email address"
        name="state-employee-email"
      />
      <TextField
        label="State employee phone number"
        name="state-employee-phone"
      />
      <h3 className="ds-u-padding-top--4 ds-u-margin-top--4 ds-u-border-top--1">Delegating Authority</h3>
      <TextField
        label="Name of the person who completed the delegation letter"
        name="certified-by-name"
      />
      <TextField
        label="Title of the person who completed the delegation letter"
        name="certified-by-title"
      />
      <TextField
        label="Email Address of the person who completed the delegation letter"
        name="certified-by-email"
      />
      <TextField
        label="Signature (Printed Name on the delegation letter) "
        name="certified-by-signature"
      />
      <div className="ds-u-padding-top--4">
        <Button className="ds-u-margin-right--2">Cancel</Button>
        <Button variation="primary">Add State Admin</Button>
      </div>
    </main>
  )
}

export default DelegateStateAdminForm;
