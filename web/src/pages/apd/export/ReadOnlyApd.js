import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  selectApdType,
  selectSummary
} from '../../../redux/selectors/apd.selectors';

import { APD_TYPE } from '@cms-eapd/common';

const ApdSummary = ({
  apdType,
  narrativeHIE,
  narrativeHIT,
  narrativeMMIS,
  programOverview
}) => {
  /* eslint-disable react/no-danger */

  function renderSpecificApdSummary(apdType) {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return (
          <div>
            <h2>APD Overview</h2>
            <h3>Program introduction</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: programOverview || 'No response was provided'
              }}
            />

            <hr className="subsection-rule" />
            <h3>HIT overview</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: narrativeHIT || 'No response was provided'
              }}
            />

            <hr className="subsection-rule" />
            <h3>HIE overview</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: narrativeHIE || 'No response was provided'
              }}
            />

            <hr className="subsection-rule" />
            <h3>MMIS overview</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: narrativeMMIS || 'No response was provided'
              }}
            />
          </div>
        );
      case APD_TYPE.MMIS:
        return <div>LOL</div>;
    }
  }

  return renderSpecificApdSummary(apdType);
};

ApdSummary.propTypes = {
  apdType: PropTypes.string.isRequired,
  narrativeHIE: PropTypes.string,
  narrativeHIT: PropTypes.string,
  narrativeMMIS: PropTypes.string,
  programOverview: PropTypes.string
};

ApdSummary.defaultProps = {
  narrativeHIE: '',
  narrativeHIT: '',
  narrativeMMIS: '',
  programOverview: ''
};

const mapStateToProps = state => ({
  apdType: selectApdType(state),
  ...selectSummary(state)
});

export default connect(mapStateToProps)(ApdSummary);
