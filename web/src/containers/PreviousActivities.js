import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPreviousActivitySummary } from '../actions/editApd';
import RichText from '../components/RichText';
import { Section, Subsection } from '../components/Section';
import ApdPreviousActivityTableHI from './ApdPreviousActivityTable';
import ApdPreviousActivityTableMMIS from './ApdPreviousActivityTableMMIS';
import ApdPreviousActivityTableTotal from './ApdPreviousActivityTableTotal';
import Waypoint from './ConnectedWaypoint';
import { t } from '../i18n';

const PreviousActivities = () => {
  const dispatch = useDispatch();

  const onChange = value => dispatch(setPreviousActivitySummary(value));

  const previousActivitySummary = useSelector(
    state => state.apd.data.previousActivitySummary
  );

  return (
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

export default PreviousActivities;
