import { FormLabel } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { forwardRef, Fragment, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { t } from '../../../../i18n';
import {
  setActivityAlternatives,
  setActivityDescription,
  setActivityOverview
} from '../../../../redux/actions/editActivity';
import RichText from '../../../../components/RichText';
import Instruction from '../../../../components/Instruction';
import { Subsection } from '../../../../components/Section';
import { NameAndFundingSourceForm } from './NameAndFundingSource/';
import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';
import Schedule from './Schedule';

import overviewSchema from '../../../../static/schemas/activityOverview';


const ActivityOverview = forwardRef(({
  activity,
  activityIndex,
  setAlternatives,
  setDescription,
  setOverview
}) => {
  ActivityOverview.displayName = 'ActivityOverview';

  const { alternatives, description, summary } = activity;

  const {
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      summary: summary,
      description: description
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(overviewSchema)
  })

  try {
    overviewSchema.validateAsync({summary});
  } catch(err) {
    console.log(err);
    console.log({errors});
  }

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
        <Controller
          name="summary"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <RichText
              id="activity-short-overview-field"
              content={summary}
              onSync={html => {
                syncOverview(html);
                onChange(html);
              }}
              editorClassName="rte-textarea-l"
              onBlur={onBlur}
            />
          )}
        />
        {errors?.summary && (
          <span
            className="ds-c-inline-error ds-c-field__error-message"
            role="alert"
          >
            {errors.summary.message}
          </span>
        )}
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
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, props } }) => (
            <RichText
              {...props}
              id="activity-description-field"
              data-cy="activity-description"
              content={description}
              onSync={html => {
                syncDescription(html);
                onChange(html);
              }}
              onBlur={onBlur}
              editorClassName="rte-textarea-l"
            />
          )}
        />

        {errors?.description && (
          <span
            className="ds-c-inline-error ds-c-field__error-message"
            role="alert"
          >
            {errors.description.message}
          </span>
        )}
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
});

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
