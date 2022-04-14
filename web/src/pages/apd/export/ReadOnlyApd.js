import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { selectSummary } from '../../../reducers/apd.selectors';

const ApdSummary = ({
  narrativeHIE,
  narrativeHIT,
  narrativeMMIS,
  programOverview
}) => {
  /* eslint-disable react/no-danger */

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
};

ApdSummary.propTypes = {
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

const mapStateToProps = selectSummary;

export default connect(mapStateToProps)(ApdSummary);
