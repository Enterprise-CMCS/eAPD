import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import {
  TextField,
  Dropdown,
  // ChoiceList,
  Choice,
  FormLabel
} from '@cmsgov/design-system';

import { t } from '../../i18n';
import {
  setActivityAlternatives,
  setActivityDescription,
  setActivityOverview
} from '../../actions/editActivity';
import RichText from '../../components/RichText';
// import Instruction from '../../components/Instruction';
import { Subsection } from '../../components/Section';
import { NameAndFundingSourceForm } from './NameAndFundingSource';
import { selectActivityByIndex } from '../../reducers/activities.selectors';
import ComprehensiveOverview from './ComprehensiveOverview';

const ActivityOverview = ({
  activity,
  activityIndex
  // setAlternatives,
  // setDescription,
  // setOverview
}) => {
  const { summary } = activity;

  // const overviewLabel = useMemo(
  //   () =>
  //     t('activities.overview.activityOverviewInput.label', {
  //       defaultValue: 'Provide a short overview of the activity.'
  //     }),
  //   []
  // );
  // const overviewHint = useMemo(
  //   () =>
  //     t('activities.overview.activityOverviewInput.hint', {
  //       defaultValue: ''
  //     }),
  //   []
  // );

  // const syncOverview = useCallback(
  //   html => {
  //     setOverview(activityIndex, html);
  //   },
  //   [activity.key]
  // );

  // const descriptionLabel = useMemo(
  //   () =>
  //     t(
  //       `activities.overview.activityDescriptionInput.${
  //         activity.fundingSource === 'HIE' ? 'hie' : 'standard'
  //       }.label`,
  //       {
  //         defaultValue:
  //           'Include as much detail as is necessary to explain the activity.'
  //       }
  //     ),
  //   [activity.fundingSource]
  // );
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
  // const syncDescription = useCallback(
  //   html => {
  //     setDescription(activityIndex, html);
  //   },
  //   [activity.key]
  // );

  // const alternativesLabel = useMemo(
  //   () =>
  //     t('activities.overview.activityAlternativesInput.label', {
  //       defaultValue: 'Provide a short overview of the activity.'
  //     }),
  //   []
  // );
  // const alternativesHint = useMemo(
  //   () =>
  //     t('activities.overview.activityAlternativesInput.hint', {
  //       defaultValue: ''
  //     }),
  //   []
  // );
  // const syncAlternatives = useCallback(
  //   html => {
  //     setAlternatives(activityIndex, html);
  //   },
  //   [activity.key]
  // );

  const dropdownOptions = [
    { label: '- Select an option -', value: '' },
    { label: '90/10 DDI', value: '90/10 DDI' },
    { label: '75/25 Operations', value: '75/25 Operations' },
    { label: '75/25 Eligibility Worker', value: '75/25 Eligibility Worker' },
    { label: '50/50 DDI', value: '50/50 DDI' },
    { label: '50/50 Operations', value: '50/50 Operations' },
    { label: '50/50 Eligibility Worker', value: '50/50 Eligibility Worker' }
  ];

  const otherField = (
    <TextField
      label="If other, specify appropriate business area."
      labelClassName="ds-u-margin-top--0"
      name="textfield_child"
    />
  );

  return (
    <Subsection
      headerClassName="header-with-top-margin"
      resource="activities.overview"
      id={`activity-overview-${activityIndex}`}
    >
      <NameAndFundingSourceForm
        index={activityIndex}
        item={{ fundingSource: activity.fundingSource, name: activity.name }} // item is activity[index]
      />
      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">
          <span>Medicaid Business Areas (MES Modules)</span>
          <p className="ds-c-field__hint ds-u-font-weight--normal ds-u-margin--0">
            Select a Medicaid Business Area(s) to represent which module your
            activity will fall under. If you do not see your Medicaid Business
            Area represented below, select other and specify business area.
          </p>
        </legend>
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Eligibility and Enrollment (E&E)"
          value="a"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Claims Processing"
          value="b"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Financial Management"
          value="c"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Decision Support System (DSS) / Data Warehouse (DW)"
          value="d"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Encounter Processing System (EPS)"
          value="e"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Long Term Services & Supports (LTSS)"
          value="f"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Member Management"
          value="g"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Prescription Drug Monitoring Program (PDMP)"
          value="h"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Pharmacy Benefit Management (PBM)"
          value="i"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Provider Management"
          value="j"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Third Party Liability (TPL)"
          value="k"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Electronic Visit Verification (EVV)"
          value="l"
        />
        <Choice
          name="checkbox_choice"
          type="checkbox"
          label="Other"
          value="m"
          checkedChildren={
            <div className="ds-c-choice__checkedChild">{otherField}</div>
          }
        />
      </fieldset>
      <Dropdown
        options={dropdownOptions}
        defaultValue=""
        hint="Select the match rate for Federal Financial Participation applicable to this activity. A FFP of 90-10 means 90% of the total will be Federal government’s share and 10% will be the State’s share.  "
        label="Federal-State Split"
        name="error_dropdown_field"
      />
      <FormLabel
        className="ds-c-label--full-width"
        hint={descriptionHint}
        fieldId="activity-description-field"
      >
        Activity Snapshot
        <p className="ds-u-font-weight--normal ds-u-margin-top--1">
          Provide a brief and high-level snapshot of the activity. You can speak
          on the purpose of your activity, its benefits, and any additional
          information that would give a reviewer a quick understanding of your
          activity.
        </p>
      </FormLabel>
      <RichText
        name="activity overview"
        label="Activity Snapshot"
        hint="Provide a brief and high-level snapshot of the activity. You can speak on purpose of your activity, its benefits, and any additional information that would give a reviewer a quick understanding of your activity."
        max={280}
        rows={6}
        className="data-entry-box"
        value={summary}
        // onChange={overviewOnChange}
      />

      <ComprehensiveOverview />

      {/* <div className="data-entry-box">
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
      </div> */}
    </Subsection>
  );
};

ActivityOverview.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired
  // setAlternatives: PropTypes.func.isRequired,
  // setDescription: PropTypes.func.isRequired,
  // setOverview: PropTypes.func.isRequired
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
