import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  selectSecurityInterfacePlan,
  selectBusinessContinuityAndDisasterRecovery
} from '../../../redux/selectors/apd.selectors';

const SecurityPlanningSummary = ({ securityInterfacePlan, BCDRPlan }) => {
  return (
    <Fragment>
      <h2>Security Planning</h2>
      <h3>Security and Interface Plan</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: securityInterfacePlan || 'No response was provided'
        }}
      />
      <h3>Business Continuity and Disaster Recovery Plan</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: BCDRPlan || 'No response was provided'
        }}
      />

      <hr className="section-rule" />
    </Fragment>
  );
};

SecurityPlanningSummary.propTypes = {
  securityInterfacePlan: PropTypes.string.isRequired,
  BCDRPlan: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  securityInterfacePlan: selectSecurityInterfacePlan(state),
  BCDRPlan: selectBusinessContinuityAndDisasterRecovery(state)
});

export default connect(mapStateToProps, null)(SecurityPlanningSummary);

export { SecurityPlanningSummary as plain, mapStateToProps };
