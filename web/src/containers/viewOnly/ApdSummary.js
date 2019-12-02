import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { selectSummary } from '../../reducers/apd.selectors';

const ApdSummary = ({
  narrativeHIE,
  narrativeHIT,
  narrativeMMIS,
  programOverview
}) => {
  return (
    <div>
      <h2>Program summary</h2>
      <h3>Program introduction</h3>
      <p dangerouslySetInnerHTML={{ __html: programOverview }} />

      <h3>HIT overview</h3>
      <p dangerouslySetInnerHTML={{ __html: narrativeHIT }} />

      <h3>HIE overview</h3>
      <p dangerouslySetInnerHTML={{ __html: narrativeHIE }} />

      <h3>MMIS overview</h3>
      <p dangerouslySetInnerHTML={{ __html: narrativeMMIS }} />
    </div>
  );
};

ApdSummary.propTypes = {
  narrativeHIE: PropTypes.string.isRequired,
  narrativeHIT: PropTypes.string.isRequired,
  narrativeMMIS: PropTypes.string.isRequired,
  programOverview: PropTypes.string.isRequired
};

const mapStateToProps = selectSummary;

export default connect(mapStateToProps)(ApdSummary);
