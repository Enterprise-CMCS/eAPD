import { FormLabel } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';

import { t } from '../../../../i18n';
import {
  setActivityAlternatives,
  setActivityDescription,
  setActivityOverview
} from '../../../../actions/editActivity';
import RichText from '../../../../components/RichText';
import Instruction from '../../../../components/Instruction';
import { Subsection } from '../../../../components/Section';
import { NameAndFundingSourceForm } from '../../../../containers/activity/NameAndFundingSource';
import { selectActivityByIndex } from '../../../../reducers/activities.selectors';
import Schedule from '../../../../containers/activity/Schedule';

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

  const syncOverview = useCallback(
    html => {
      setOverview(activityIndex, html);
    },
    [activityIndex, setOverview]
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
    [activityIndex, setDescription]
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
    [activityIndex, setAlternatives]
  );

  return (
    <Subsection
      headerClassName="header-with-top-margin"
      resource="activities.overview"
      id={`activity-overview-${activityIndex}`}
    >
      {activityIndex === 0 ? (
        <Fragment>
          <h4>Activity name: {activity.name || 'Untitled'}</h4>
          <h4>Funding source: {activity.fundingSource}</h4>
        </Fragment>
      ) : (
        <NameAndFundingSourceForm
          index={activityIndex}
          item={{ fundingSource: activity.fundingSource, name: activity.name }} // item is activity[index]
        />
      )}

      <div className="data-entry-box">
        <FormLabel
          className="ds-c-label--full-width"
          hint={overviewHint}
          fieldId="activity-short-overview-field"
        >
          {overviewLabel}
        </FormLabel>
        <RichText
          id="activity-short-overview-field"
          content={summary}
          onSync={syncOverview}
          editorClassName="rte-textarea-l"
        />
      </div>

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
