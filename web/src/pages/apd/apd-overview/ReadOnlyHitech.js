import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { selectSummary } from '../../../redux/selectors/apd.selectors';

const HitechSummary = ({
  narrativeHIE,
  narrativeHIT,
  narrativeMMIS,
  programOverview
}) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

HitechSummary.propTypes = {
  narrativeHIE: PropTypes.string,
  narrativeHIT: PropTypes.string,
  narrativeMMIS: PropTypes.string,
  programOverview: PropTypes.string
};

HitechSummary.defaultProps = {
  narrativeHIE: '',
  narrativeHIT: '',
  narrativeMMIS: '',
  programOverview: ''
};

const mapStateToProps = selectSummary;

export default connect(mapStateToProps)(HitechSummary);
