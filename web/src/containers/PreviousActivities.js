import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { RichText } from '../components/Inputs';
import { Section, Subsection } from '../components/Section';
import StayTuned from '../components/StayTuned';
import { t } from '../i18n';

const PreviousActivities = ({ previousActivitySummary, updateApd }) => (
  <Section id="prev-activities" resource="previousActivities">
    <Subsection resource="previousActivities.outline">
      <div className="mb-tiny bold">
        {t('previousActivities.outline.label')}
      </div>
      <RichText
        content={previousActivitySummary}
        onSync={html => updateApd({ previousActivitySummary: html })}
      />
    </Subsection>
    <Subsection resource="previousActivities.approvedExpenses">
      <StayTuned />
    </Subsection>
    <Subsection resource="previousActivities.actualExpenses">
      <StayTuned />
    </Subsection>
  </Section>
);

PreviousActivities.propTypes = {
  previousActivitySummary: PropTypes.string.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd }) => ({
  previousActivitySummary: apd.data.previousActivitySummary
});

const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(mapStateToProps, mapDispatchToProps)(PreviousActivities);
