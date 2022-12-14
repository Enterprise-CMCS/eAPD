import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { APD_TYPE } from '@cms-eapd/common/utils/constants';
import MMISOverview from './MMISOverview';
import HITECHOverview from './HITECHOverview';
import StandardsAndConditions from './StandardsAndConditions';

const Overview = ({ activityIndex, apdType }) => {
  const apdTypeToActivityOverviewMapping = {
    [APD_TYPE.HITECH]: (
      <Fragment>
        <HITECHOverview activityIndex={activityIndex} />
        <StandardsAndConditions activityIndex={activityIndex} />
      </Fragment>
    ),
    [APD_TYPE.MMIS]: <MMISOverview activityIndex={activityIndex} />
  };

  return apdTypeToActivityOverviewMapping[apdType];
};

Overview.defaultProps = {
  apdType: APD_TYPE.HITECH
};

Overview.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  apdType: PropTypes.oneOf(Object.values(APD_TYPE))
};

const mapStateToProps = state => {
  return {
    apdType: state.apd.data.apdType
  };
};

export default connect(mapStateToProps)(Overview);

export { Overview as plain, mapStateToProps };
