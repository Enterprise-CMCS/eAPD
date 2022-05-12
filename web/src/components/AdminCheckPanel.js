import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { toggleAdminCheck } from '../redux/actions/app/apd';

import { Drawer, Accordion, AccordionItem } from '@cmsgov/design-system';

import Icon, { faExclamationTriangle } from '../components/Icons';

const AdminCheckPanel = ({showAdminCheck, metadata, toggleAdminCheck: toggleAdmin}) => {

  const handleClose = () => {
    toggleAdmin(false);
  };

  return (
    <Fragment>
      {showAdminCheck && (
        <Drawer
          footerBody={null}
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
            <h3>To Do</h3>
            {Object.keys(metadata.todo).map((key, index) => (
              <Accordion bordered>
                <AccordionItem
                  heading="Controlled accordion"
                  defaultOpen
                  isControlledOpen={true}
                  onChange={() => handleClose}
                >
                  <p>
                    In a controlled accordion, the accordion panel&apos;s open state is controlled by the
                    application, by passing <code>isControlledOpen</code> and <code>onChange</code>
                    props. The <code>isControlledOpen</code> boolean flag sets the panel to an open or
                    close state.
                  </p>
                </AccordionItem>
              </Accordion>
            ))}
            <h3>Recently Completed</h3>
            <p>No sections recently completed</p>
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