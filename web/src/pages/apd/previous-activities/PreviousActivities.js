import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import ApdPreviousActivityTableHI from './ApdPreviousActivityTable';
import HitechApdPreviousActivityMmis from './HitechApdPreviousActivityMmis';
import MmisApdPreviousActivityTable from './MmisApdPreviousActivityTable';
import ApdPreviousActivityTableTotalsHITECH from './ApdPreviousActivityTableTotalsHITECH';
import ApdPreviousActivityTableTotalsMMIS from './ApdPreviousActivityTableTotalsMMIS';
import Waypoint from '../../../components/ConnectedWaypoint';
import { setPreviousActivitySummary } from '../../../redux/actions/editApd';
import RichText from '../../../components/RichText';
import { Section, Subsection } from '../../../components/Section';
import { t } from '../../../i18n';
import {
  selectPreviousActivitySummary,
  selectApdType
} from '../../../redux/selectors/apd.selectors';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

const PreviousActivities = ({
  previousActivitySummary,
  setSummary,
  apdType
}) => {
  const onChange = value => setSummary(value);

  return (
    <React.Fragment>
      <Waypoint /> {/* Waypoint w/o id indicates top of page */}
      <AlertMissingFFY />
      <Section resource="previousActivities">
        <Waypoint id="prev-activities-outline" />
        <Subsection
          id="prev-activities-outline"
          resource="previousActivities.outline"
        >
          <label htmlFor="previous-activity-summary-field">
            <h4 className="ds-c-label">
              {titleCase(t('previousActivities.outline.instruction.label'))}
            </h4>
          </label>
          <RichText
            id="previous-activity-summary-field"
            iframe_aria_text="Previous Activities Summary Text Area"
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
          {apdType === 'HITECH' && <ApdPreviousActivityTableHI />}
          {apdType === 'HITECH' && <HitechApdPreviousActivityMmis />}
          {apdType === 'HITECH' && <ApdPreviousActivityTableTotalsHITECH />}

          {apdType === 'MMIS' && <MmisApdPreviousActivityTable />}
          {apdType === 'MMIS' && <ApdPreviousActivityTableTotalsMMIS />}
        </Subsection>
      </Section>
    </React.Fragment>
  );
};

PreviousActivities.propTypes = {
  previousActivitySummary: PropTypes.string.isRequired,
  setSummary: PropTypes.func.isRequired,
  apdType: PropTypes.string
};

const mapStateToProps = state => ({
  previousActivitySummary: selectPreviousActivitySummary(state),
  apdType: selectApdType(state)
});

const mapDispatchToProps = {
  setSummary: setPreviousActivitySummary
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviousActivities);

export { PreviousActivities as plain, mapStateToProps, mapDispatchToProps };
