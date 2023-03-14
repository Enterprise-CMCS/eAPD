import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import { APD_TYPE } from '@cms-eapd/common';

import { selectApdType } from '../../../redux/selectors/apd.selectors';

import HitechSummary from './ReadOnlyHitech';
import MmisSummary from './ReadOnlyMmis';

class OverviewSummary extends PureComponent {
  render() {
    const { apdType } = this.props;
    console.log(apdType);

    function renderApdTypeSpecificOverview(apdType) {
      switch (apdType) {
        case APD_TYPE.HITECH:
          return <HitechSummary />;
        case APD_TYPE.MMIS:
          return <MmisSummary />;
        default:
          return null;
      }
    }

    return (
      <Fragment>
        <h2>APD Overview</h2>
        {renderApdTypeSpecificOverview(apdType)}
      </Fragment>
    );
  }
}

OverviewSummary.propTypes = {
  apdType: PropTypes.string
};

const mapStateToProps = state => ({
  apdType: selectApdType(state)
});

export default connect(mapStateToProps, null)(OverviewSummary);

export { OverviewSummary as plain, mapStateToProps };
