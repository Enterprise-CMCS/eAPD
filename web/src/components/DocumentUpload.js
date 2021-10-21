import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop, useUppy } from '@uppy/react';

import { API_COOKIE_NAME } from '../constants';
import { apiUrl } from '../util/api';
import { getCookie } from '../util/auth';
import { Xmark, PDFFileBlue } from './Icons';

const DocumentUpload = ({
  endpoint,
  fileTypes,
  handleFileChange
}) => {
  
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  
  const uppy = useUppy(() => {
    const authToken = JSON.parse(getCookie(API_COOKIE_NAME)).accessToken;
    
    return new Uppy({
      meta: { type: 'doc' },
      restrictions: { 
        maxNumberOfFiles: 1, 
        allowedFileTypes: fileTypes
      },
      autoProceed: true
    }).use(XHRUpload, {
      endpoint,
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
    setFileUrl(`${apiUrl}${result.successful[0].response.body.url}`);
    
    handleFileChange(`${apiUrl}${result.successful[0].response.body.url}`);
  });
  
  const hideUploadedFileLink = () => {
    uppy.reset();
    setFileName('');
    
    handleFileChange('');
  };
  
  return (
    <div>
      {fileName && (
        <div className="ds-u-display--flex ds-u-align-items--center ds-u-justify--space-between">
          <PDFFileBlue />
          <a className="ds-u-margin-x--1" href={`${fileUrl}`}>{fileName}</a>
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
    </div>
  );
};

DocumentUpload.propTypes = {
  endpoint: PropTypes.string.isRequired,
  fileTypes: PropTypes.array.isRequired,
  handleFileChange: PropTypes.func.isRequired
}

export default DocumentUpload;