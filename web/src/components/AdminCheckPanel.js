import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { toggleAdminCheck } from '../redux/actions/app/apd';

import { Drawer } from '@cmsgov/design-system';

import Icon, { faExclamationTriangle } from '../components/Icons';

const AdminCheckPanel = ({showAdminCheck, metadata, toggleAdminCheck: toggleAdmin}) => {

  const handleClose = () => {
    toggleAdmin(false);
  };
  
  const handleStopCheck = () => {
    alert("this isn't built yet...");
    toggleAdmin(false);
  };

  return (
    <Fragment>
      {showAdminCheck && (
        <Drawer
          footerBody={
            <p className="ds-text ds-u-margin--0">
              <Icon className="ds-u-color--error ds-u-margin-right--1" icon={faExclamationTriangle} />
              <a onClick={handleStopCheck} className="ds-u-color--error">Stop Administrative Check</a> 
              <br/> 
              APDs cannot be submitted until all required fields are complete. Exiting the required fields review will pause the review until you choose to restart the review or complete all required fields.
            </p>
          }
          heading="Administrative Check"
          headingLevel={2}
          onCloseClick={handleClose}
          className="eapd-admin-check__drawer"
        >
          <p>
            Review the list below for any required fields in this APD which are missing content. These fields must be completed before submission to CMS.
          </p>
          <div className="ds-u-border--2 ds-u-padding--2">
            <div className="ds-u-display--flex ds-u-justify-content--end ds-u-text-align--right ds-u-align-items--center">
              <span className="ds-u-color--error ds-u-font-weight--bold ds-u-margin-right--2">Incomplete <br /> Required Fields</span>
              <span class="ds-u-fill--error ds-u-color--white ds-u-radius ds-u-padding-x--3 ds-u-padding-y--2 ds-u-font-size--2xl ds-u-font-weight--bold">{metadata.incomplete}</span>
            </div>
            <hr className="eapd-admin-check__divider" />
            {metadata.todo.map((todo, index) => (
              <div>
              <h3>To Do</h3>
              {todo[Object.keys(todo)].incomplete > 0 && (
                <div className="ds-u-padding-bottom--2">
                  <strong>{todo[Object.keys(todo)].name}</strong>
                  <p className="ds-u-margin--0">Incomplete: {todo[Object.keys(todo)].incomplete}</p>
                  {todo[Object.keys(todo)].fields.map(item => (
                    <div className="ds-u-padding-bottom--2">
                      <div><strong>Field name:</strong> {item.name}</div>
                      <div><strong>Field description:</strong> {item.description}</div>
                    </div>
                  ))}
                </div>
              )}
              <h3>Recently Completed</h3>
              </div>
            ))}
          </div>
        </Drawer>
      )}
    </Fragment>
  );
};

AdminCheckPanel.propTypes = {
  toggleAdminCheck: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  showAdminCheck: state.apd.adminCheck,
  metadata: state.apd.data.metadata
});

const mapDispatchToProps = {
  toggleAdminCheck
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCheckPanel);

export { AdminCheckPanel as plain, mapDispatchToProps, AdminCheckPanel, mapStateToProps };