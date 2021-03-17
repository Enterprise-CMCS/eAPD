import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Button, Choice, ChoiceList, TextField } from '@cmsgov/design-system';

const backToDashboard = (e) => {
  e.preventDefault();
  window.location.href="/"
}

const handleFundingChoice = (e) => {
 localStorage.setItem('apd-funding-source', e.target.value);
}

const handleNameInput = (e) => {
  localStorage.setItem('apd-name', e.target.value);
}

const eligibilityChildren = (
  <ChoiceList
    className="ds-u-margin--0"
    choices={[
      { label: 'E&E (Eligibility and Enrollment)', value: 'e&e'},
      { label: 'HITECH', value: 'hitech' },
      { label: 'MMIS (Medicaid Management Information System', value: 'mmis', disabled: true },
    ]}
    name="size-variants"
    type="radio"
    size="large"
    onChange={handleFundingChoice}
  />
);

const childField = (
  <ChoiceList
    className="ds-u-margin--0"
    choices={[
      { label: 'E&E (Eligibility and Enrollment)', value: 'e&e'},
      { label: 'HITECH', value: 'hitech' },
      { label: 'MMIS (Medicaid Management Information System', value: 'mmis', disabled: true },
    ]}
    name="size-variants"
    type="radio"
    size="large"
    onChange={handleFundingChoice}
  />
);

const CreateAPDForm = (

) => {
  return (
    <main
      id="start-main-content"
      className="create-apd-prototype ds-l-container ds-u-margin-y--5 ds-u-padding-top--5"
    >
      <h1 className="ds-u-margin-bottom--0">Create a New APD</h1>
      <p className="ds-u-margin-top--0">Complete the fields below to create your APD. Once the APD is created, selectios with a * cannot be changed.</p>
      <h2 className="ds-u-margin-top--4">APD Name</h2>
      <p className="instruction-box ds-u-measure--wide ds-u-margin-bottom--0">Examples: Identification numbers, brief descriptions of the APD’s purpose, or any identifier that would distinguish this APD from others within your state. This can align with your existing naming conventions.</p>
      <TextField className="ds-u-margin--0" onChange={handleNameInput} />


      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">
          <h2 className="ds-u-margin-top--2 ds-u-margin-bottom--0">Funding Source ⃰</h2>
        </legend>
        <Choice 
          name="radio_choice" 
          type="radio" 
          label="E&E (Eligibility and Enrollment)" 
          value="e&e" 
          checkedChildren={<div className="ds-c-choice__checkedChild">{eligibilityChildren}</div>}
        />
        <Choice
          name="radio_choice"
          type="radio"
          label="HITECH"
          value="hitech"
          checkedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
        />        
      </fieldset>

      <div className="ds-u-display--flex ds-u-justify-content--between ds-u-margin-y--6 create-apd-buttons">
        <Button onClick={backToDashboard}>Back to Dashboard</Button>
        <Button variation="primary">Create an APD</Button>
      </div>
    </main>
  );
};

CreateAPDForm.propTypes = {

};

CreateAPDForm.defaultProps = {

};

const mapDispatchToProps = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAPDForm);

export { CreateAPDForm as plain, mapStateToProps, mapDispatchToProps };
