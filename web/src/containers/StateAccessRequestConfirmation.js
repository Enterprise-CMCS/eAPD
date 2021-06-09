import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@cmsgov/design-system';

const StateAccessRequestConfirmation = ({ action }) => (
  <div id="start-main-content">
    <div className="card--container">
      <div className="ds-l-container">
        <div className="ds-l-row card">
          <div className="ds-l-col--1 ds-u-margin-left--auto" />
          <div className="ds-l-col--12 ds-l-sm-col--10 ds-l-lg-col--6">
            <h1 className="ds-h1 ds-u-margin--0">Thank you!</h1>
            <div className="ds-u-margin-bottom--4">
              <label
                htmlFor="states"
                className="ds-c-label ds-u-margin-y--2 ds-u-font-weight--normal"
              >
                An administrator will verify your affiliation and
                credentials.
              </label>
              <hr className="ds-u-color--gray-lighter ds-u-margin-top--1" />
              <div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3">
                <Button variation="primary" type="submit" onClick={action}>
                  Ok
                </Button>
              </div>
            </div>
          </div>
          <div className="ds-l-col--1 ds-u-margin-right--auto" />
        </div>
      </div>
    </div>
  </div>
);

StateAccessRequestConfirmation.propTypes = {
  action: PropTypes.func.isRequired
};

export default StateAccessRequestConfirmation;
