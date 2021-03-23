import { FormLabel } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';

import { TextField, Dropdown, ChoiceList } from '@cmsgov/design-system';

import { t } from '../../i18n';
import {
  setActivityAlternatives,
  setActivityDescription,
  setActivityOverview
} from '../../actions/editActivity';
import RichText from '../../components/RichText';
import Instruction from '../../components/Instruction';
import { Subsection } from '../../components/Section';
import { NameAndFundingSourceForm } from './NameAndFundingSource';
import TextArea from '../../components/TextArea';
import { selectActivityByIndex } from '../../reducers/activities.selectors';
import Schedule from './Schedule';


const ActivityOverview = ({
  activity,
  activityIndex,
  setAlternatives,
  setDescription,
  setOverview
}) => {
  const { alternatives, description, summary } = activity;

  const overviewLabel = useMemo(
    () =>
      t('activities.overview.activityOverviewInput.label', {
        defaultValue: 'Provide a short overview of the activity.'
      }),
    []
  );
  const overviewHint = useMemo(
    () =>
      t('activities.overview.activityOverviewInput.hint', {
        defaultValue: ''
      }),
    []
  );
  const overviewOnChange = useCallback(
    ({ target: { value } }) => setOverview(activityIndex, value),
    [activity.key]
  );

  const descriptionLabel = useMemo(
    () =>
      t(
        `activities.overview.activityDescriptionInput.${
          activity.fundingSource === 'HIE' ? 'hie' : 'standard'
        }.label`,
        {
          defaultValue:
            'Include as much detail as is necessary to explain the activity.'
        }
      ),
    [activity.fundingSource]
  );
  const descriptionHint = useMemo(
    () =>
      t(
        `activities.overview.activityDescriptionInput.${
          activity.fundingSource === 'HIE' ? 'hie' : 'standard'
        }.hint`,
        {
          defaultValue: ''
        }
      ),
    [activity.fundingSource]
  );
  const syncDescription = useCallback(
    html => {
      setDescription(activityIndex, html);
    },
    [activity.key]
  );

  const alternativesLabel = useMemo(
    () =>
      t('activities.overview.activityAlternativesInput.label', {
        defaultValue: 'Provide a short overview of the activity.'
      }),
    []
  );
  const alternativesHint = useMemo(
    () =>
      t('activities.overview.activityAlternativesInput.hint', {
        defaultValue: ''
      }),
    []
  );
  const syncAlternatives = useCallback(
    html => {
      setAlternatives(activityIndex, html);
    },
    [activity.key]
  );

  const dropdownOptions = [
    { label: '- Select an option -', value: '' },
    { label: '90/10', value: '90/10' },
    { label: '75/25', value: '2' },
    { label: '50/50', value: '3' }
  ];

  
  return (
    <Subsection
      headerClassName="header-with-top-margin"
      resource="activities.overview"
      id={`activity-overview-${activityIndex}`}
    >
      {activityIndex === 0 ? (
        <Fragment>
          <TextField
            defaultValue=""
            label="Activity Name"
            labelClassName="ds-u-margin-top--4"
            name="single_example"
          />
          <Dropdown
            options={dropdownOptions}
            defaultValue=""
            hint="Select the match rate for Federal Financial Participation applicable to this activity. A FFP of 90-10 means 90% of the total will be Federal government’s share and 10% will be the State’s share.  "
            label="Federal-State Split"
            name="error_dropdown_field"
          />
          <ChoiceList
            choices={[
              { label: 'Eligibility and Enrollment (E&E)', value: 'A', defaultChecked: true },
              { label: 'Claims Processing', value: 'B' },
              { label: 'Financial Management', value: 'C' },
              { label: 'Decision Support System (DSS) / Data Warehouse (DW)', value: 'D' },
              { label: 'Encounter Processing System (EPS)', value: 'E' },
              { label: 'Long Term Services & Supports (LTSS)', value: 'F' },
              { label: 'Member Management', value: 'G' },
              { label: 'Prescription Drug Monitoring Program (PDMP)', value: 'H' },
              { label: 'Pharmacy Benefit Management (PBM)', value: 'I' },
              { label: 'Provider Management', value: 'J' },
              { label: 'Third Party Liability (TPL)', value: 'K' },
              { label: 'Electronic Visit Verification (EVV)', value: 'L' },
              { label: 'Other', value: 'M' },
            ]}
            className="ds-u-margin-top--4"
            label="Medicaid Business Areas (MES Modules)"
            hint="Select a Medicaid Business Area(s) to represent which module your activity will fall under. If you 
            do not see your Medicaid Business Area represented below, select other and specify business area."
            name="checkbox_choices"
            type="checkbox"
          />
        </Fragment>
      ) : (
        <NameAndFundingSourceForm
          index={activityIndex}
          item={{ fundingSource: activity.fundingSource, name: activity.name }} // item is activity[index]
        />
      )}
        <FormLabel
          className="ds-c-label--full-width"
          hint={descriptionHint}
          fieldId="activity-description-field"
        >
          Activity Snapshot
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">Provide a brief and high-level snapshot of the activity. You can speak on purpose of your activity, its benefits, and any additional information that would give a reviewer a quick understanding of your activity.</p>
        </FormLabel>
      <RichText
        name="activity overview"
        label="Activity Snapshot"
        hint="Provide a brief and high-level snapshot of the activity. You can speak on purpose of your activity, its benefits, and any additional information that would give a reviewer a quick understanding of your activity."
        max={280}
        rows={6}
        className="data-entry-box"
        value={summary}
        onChange={overviewOnChange}
      />
      <Schedule activityIndex={activityIndex} />

      <div className="data-entry-box">
        <FormLabel
          className="ds-c-label--full-width"
          hint={descriptionHint}
          fieldId="activity-description-field"
        >
          {descriptionLabel}
        </FormLabel>
        {activity.fundingSource === 'HIE' && (
          <Instruction source="activities.overview.activityDescriptionInput.hie" />
        )}
        <RichText
          id="activity-description-field"
          content={description}
          onSync={syncDescription}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="data-entry-box">
        <FormLabel
          className="ds-c-label--full-width"
          hint={alternativesHint}
          fieldId="activity-alternatives-field"
        >
          {alternativesLabel}
        </FormLabel>
        <Instruction source="activities.overview.activityAlternativesInput" />
        <RichText
          id="activity-alternatives-field"
          content={alternatives}
          onSync={syncAlternatives}
          editorClassName="rte-textarea-l"
        />
      </div>
      <hr />
    </Subsection>
  );
};

ActivityOverview.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setAlternatives: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setOverview: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => {
  return {
    activity: selectActivityByIndex(state, { activityIndex })
  };
};

const mapDispatchToProps = {
  setAlternatives: setActivityAlternatives,
  setDescription: setActivityDescription,
  setOverview: setActivityOverview
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityOverview);

export { ActivityOverview as plain, mapStateToProps, mapDispatchToProps };
