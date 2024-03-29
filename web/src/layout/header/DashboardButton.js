import { Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { goToDashboard } from '../../redux/actions/app';

const DashboardButton = ({ children, dashboard }) => {
  return (
    <Button variation="transparent" onClick={() => dashboard()}>
      {children}
    </Button>
  );
};

DashboardButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.array]),
  dashboard: PropTypes.func.isRequired
};

const mapDispatchToProps = { dashboard: goToDashboard };

export default connect(null, mapDispatchToProps)(DashboardButton);

export { DashboardButton as plain, mapDispatchToProps };
