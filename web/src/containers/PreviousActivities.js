import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ApdPreviousActivityTableHI from './ApdPreviousActivityTable';
import ApdPreviousActivityTableMMIS from './ApdPreviousActivityTableMMIS';
import ApdPreviousActivityTableTotal from './ApdPreviousActivityTableTotal';
import Waypoint from './ConnectedWaypoint';
import { setPreviousActivitySummary } from '../actions/editApd';
import RichText from '../components/RichText';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';
import { selectPreviousActivitySummary } from '../reducers/apd.selectors';

const PreviousActivities = ({ previousActivitySummary, setSummary }) => {
  const onChange = value => setSummary(value);

  return (
    <Waypoint id="prev-activities-overview">
      <Section id="prev-activities" resource="previousActivities">
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
            onSync={onChange}
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
};

PreviousActivities.propTypes = {
  previousActivitySummary: PropTypes.string.isRequired,
  setSummary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  previousActivitySummary: selectPreviousActivitySummary(state)
});

const mapDispatchToProps = {
  setSummary: setPreviousActivitySummary
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviousActivities);

export { PreviousActivities as plain, mapStateToProps, mapDispatchToProps };
