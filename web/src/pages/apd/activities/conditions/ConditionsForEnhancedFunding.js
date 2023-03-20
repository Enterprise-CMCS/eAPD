import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setEnhancedFundingQualification,
  setEnhancedFundingJustification
} from '../../../../redux/actions/editActivity/conditionsForEnhancedFunding';
import { selectAdminCheckEnabled } from '../../../../redux/selectors/apd.selectors';
import { selectConditionsForEnhancedFundingByActivityIndex } from '../../../../redux/selectors/activities.selectors';
import { Subsection } from '../../../../components/Section';
import StandardsAndConditionsHelpDrawer from '../../../../components/StandardsAndConditionsHelpDrawer';

const ConditionsForEnhancedFunding = ({
  activityIndex,
  enhancedFundingQualification,
  enhancedFundingJustification,
  setQualification,
  setJustification
}) => {
  return (
    <Subsection resource="activities.conditions">
      <StandardsAndConditionsHelpDrawer />
    </Subsection>
  );
};

ConditionsForEnhancedFunding.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  enhancedFundingQualification: PropTypes.bool,
  enhancedFundingJustification: PropTypes.string,
  setQualification: PropTypes.func.isRequired,
  setJustification: PropTypes.func.isRequired
};

const mapStateToProps = (
  state,
  { activityIndex },
  {
    getConditionsForEnhancedFunding = selectConditionsForEnhancedFundingByActivityIndex
  } = {}
) => {
  const { enhancedFundingQualification, enhancedFundingJustification } =
    getConditionsForEnhancedFunding(state, { activityIndex });
  return {
    adminCheck: selectAdminCheckEnabled(state),
    enhancedFundingQualification,
    enhancedFundingJustification
  };
};

const mapDispatchToProps = {
  setQualification: setEnhancedFundingQualification,
  setJustification: setEnhancedFundingJustification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionsForEnhancedFunding);

export {
  ConditionsForEnhancedFunding as plain,
  mapStateToProps,
  mapDispatchToProps
};
