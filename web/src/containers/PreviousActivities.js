import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import RichText from '../components/RichText';
import { Section, Subsection } from '../components/Section';
import ApdPreviousActivityTableHI from './ApdPreviousActivityTable';
import ApdPreviousActivityTableMMIS from './ApdPreviousActivityTableMMIS';
import ApdPreviousActivityTableTotal from './ApdPreviousActivityTableTotal';
import Waypoint from './ConnectedWaypoint';
import { t } from '../i18n';

const PreviousActivities = ({ previousActivitySummary, updateApd }) => (
  <Waypoint id="prev-activities-overview">
    <Section isNumbered id="prev-activities" resource="previousActivities">
      <Waypoint id="prev-activities-outline" />
      <Subsection
        id="prev-activities-outline"
        resource="previousActivities.outline"
      >
        <h4 className="ds-c-label">
          {t('previousActivities.outline.instruction.label')}
        </h4>
        <RichText
          content={previousActivitySummary}
          onSync={html => updateApd({ previousActivitySummary: html })}
          editorClassName="rte-textarea-l"
        />
      </Subsection>

      <Waypoint id="prev-activities-table" />
      <Subsection
        id="prev-activities-table"
        resource="previousActivities.actualExpenses"
      >
        <ApdPreviousActivityTableHI />
        <ApdPreviousActivityTableMMIS />
        <ApdPreviousActivityTableTotal />
      </Subsection>
    </Section>
  </Waypoint>
);

PreviousActivities.propTypes = {
  previousActivitySummary: PropTypes.string.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd }) => ({
  previousActivitySummary: apd.data.previousActivitySummary
});

const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviousActivities);

export { PreviousActivities as plain, mapStateToProps, mapDispatchToProps };
