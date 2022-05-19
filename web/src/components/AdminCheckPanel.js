import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleAdminCheck } from '../redux/actions/app/apd';

import { Drawer, Accordion, AccordionItem } from '@cmsgov/design-system';

const AdminCheckPanel = ({showAdminCheck, metadata, toggleAdmin}) => {
  
  const handleClose = () => {
    toggleAdmin(false);
  };

  return (
    <Fragment>
      {showAdminCheck && (
        <Drawer
          footerBody={null}
          heading="Administrative Check"
          headingLevel="2"
          onCloseClick={handleClose}
          className="eapd-admin-check__drawer"
        >
          <p>
            Review the list below for any required fields in this APD which are missing content. These fields must be completed before submission to CMS.
          </p>
          <div className="ds-u-border--2 ds-u-padding--2">
            <div className="ds-u-display--flex ds-u-justify-content--end ds-u-text-align--right ds-u-align-items--center">
              <span className="ds-u-color--error ds-u-font-weight--bold ds-u-margin-right--2">Incomplete <br /> Required Fields</span>
              <span className="ds-u-fill--error ds-u-color--white ds-u-radius ds-u-padding-x--3 ds-u-padding-y--2 ds-u-font-size--2xl ds-u-font-weight--bold">{metadata.incomplete}</span>
            </div>
            <hr className="eapd-admin-check__divider" />
            <h3>To Do</h3>
            <Accordion bordered>
              {Object.keys(metadata.todo).map((key) => (
                  <AccordionItem
                    key={key}
                    heading={
                      <Fragment key={key}>
                        <h3 className="ds-u-margin--0">{metadata.todo[key].name}: <span className="ds-u-font-weight--normal">{metadata.todo[key].incomplete} field(s) to complete</span></h3>
                        <Link to={metadata.todo[key].link}>Go to the {metadata.todo[key].name} page.</Link>
                      </Fragment>
                    }
                    defaultOpen={false}
                  >
                  <ol>
                    {metadata.todo[key].fields.map((field) => (
                      <li key={field.name} className="ds-h5">
                        {field.name} <br />
                        <span className="ds-u-font-weight--normal">{field.description}</span>
                      </li>
                    ))}
                  </ol>
                  </AccordionItem>
              ))}
            </Accordion>
            <h3>Recently Completed</h3>
            {metadata.recents.length > 0 && (
              <div>
              {metadata.recents.map((item) => (
                <div key={item.section} className="ds-u-border--1 ds-u-margin-bottom--2 ds-u-padding--2">
                  <h3 className="ds-u-margin--0">{item.page}</h3>
                  <Link to={item.link}>Go to the {item.section} page.</Link>
                </div>
              ))}
              </div>
            )}
            {metadata.recents.length === 0 && (
              <p>No sections recently completed</p>
            )}
          </div>
        </Drawer>
      )}
    </Fragment>
  );
};

AdminCheckPanel.propTypes = {
  toggleAdmin: PropTypes.func.isRequired,
  showAdminCheck: PropTypes.bool.isRequired,
  metadata: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  showAdminCheck: state.apd.adminCheck,
  metadata: state.apd.data.metadata
});

const mapDispatchToProps = {
  toggleAdmin: toggleAdminCheck
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCheckPanel);

export { AdminCheckPanel as plain, mapDispatchToProps, AdminCheckPanel, mapStateToProps };