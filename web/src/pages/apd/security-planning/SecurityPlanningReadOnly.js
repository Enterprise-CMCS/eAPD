import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  selectSecurityInterfacePlan,
  selectBusinessContinuityAndDisasterRecovery
} from '../../../redux/selectors/apd.selectors';

class SecuritySummary extends PureComponent {
  render() {
    const { securityInterfacePlan, BCDRPlan } = this.props;
    return (
      <Fragment>
        <hr className="section-rule ds-u-margin-y--3" />
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
      </Fragment>
    );
  }
}

SecuritySummary.propTypes = {
  securityInterfacePlan: PropTypes.string.isRequired,
  BCDRPlan: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  securityInterfacePlan: selectSecurityInterfacePlan(state),
  BCDRPlan: selectBusinessContinuityAndDisasterRecovery(state)
});

export default connect(mapStateToProps, null)(SecuritySummary);

export { SecuritySummary as plain, mapStateToProps };
