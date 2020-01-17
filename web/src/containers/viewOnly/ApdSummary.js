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
  /* eslint-disable react/no-danger */

  return (
    <div>
      <h2>Program summary</h2>
      <h3>Program introduction</h3>
      <p dangerouslySetInnerHTML={{ __html: programOverview }} />

      <hr className="subsection-rule" />
      <h3>HIT overview</h3>
      <p dangerouslySetInnerHTML={{ __html: narrativeHIT }} />

      <hr className="subsection-rule" />
      <h3>HIE overview</h3>
      <p dangerouslySetInnerHTML={{ __html: narrativeHIE }} />

      <hr className="subsection-rule" />
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
