import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { toggleAdminCheck } from '../actions/app/apd';

import { Drawer } from '@cmsgov/design-system';

const AdminCheckPanel = ({showAdminCheck, metadata, toggleAdminCheck: toggleAdmin}) => {

  console.log("toggle state", showAdminCheck);

  const handleClose = () => {
    toggleAdmin(false);
  };

  return (
    <Fragment>
      {showAdminCheck && (
        <Drawer
          footerTitle="Footer Title"
          footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
          heading="Administrative Check"
          onCloseClick={handleClose}
        >
          <p>
            Review the list below for any required fields in this APD which are missing content. These fields must be completed before submission to CMS.
          </p>
          <p># of incomplete {metadata.incomplete}</p>
          {metadata.todo.map(todo => (
            <div>
              <p>{todo.key}</p>
              <p>{todo.name}</p>
              <p>{todo.description}</p>
            </div>
          ))}
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
