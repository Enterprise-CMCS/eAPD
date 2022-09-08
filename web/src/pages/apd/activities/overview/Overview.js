import { FormLabel } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useMemo } from 'react';
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

import overviewSchema from '@cms-eapd/common/schemas/activityOverview';

const ActivityOverview = ({
  activity,
  activityIndex,
  setAlternatives,
  setDescription,
  setOverview,
  adminCheck
}) => {
  ActivityOverview.displayName = 'ActivityOverview';

  const { alternatives, description, summary } = activity;

  const {
    control,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: {
      alternatives: alternatives,
      description: description,
      summary: summary
    },
    resolver: joiResolver(overviewSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <label
          id="label-for-summary"
          className="ds-c-label--full-width"
          hint={overviewHint}
          htmlFor="activity-short-overview-field"
        >
          {overviewLabel}
        </label>
        <Controller
          name="summary"
          control={control}
          render={({ field: { onChange } }) => (
            <RichText
              id="activity-short-overview-field"
              iframe_aria_text="Provide a short overview of the activity Text Area"
              role={summary}
              content={summary}
              onSync={html => {
                setOverview(activityIndex, html);
                onChange(html);

                if (adminCheck) {
                  trigger();
                }
              }}
              editorClassName="rte-textarea-l"
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
          htmlFor="activity-description-field"
        >
          {descriptionLabel}
        </FormLabel>
        {activity.fundingSource === 'HIE' && (
          <Instruction source="activities.overview.activityDescriptionInput.hie" />
        )}
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <RichText
              {...props}
              id="activity-description-field"
              iframe_aria_text="Include as much detail as is necessary to explain the activity Text Area"
              role={description}
              content={description}
              onSync={html => {
                setDescription(activityIndex, html);
                onChange(html);

                if (adminCheck) {
                  trigger();
                }
              }}
              data-cy="activity-description"
              editorClassName="rte-textarea-l"
              error={errors?.description?.message}
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
          htmlFor="activity-alternatives-field"
        >
          {alternativesLabel}
        </FormLabel>
        <Instruction source="activities.overview.activityAlternativesInput" />
        <RichText
          id="activity-alternatives-field"
          iframe_aria_text="Statement of alternative considerations and supporting justification Text Area"
          content={alternatives}
          onSync={html => {
            setAlternatives(activityIndex, html);
          }}
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
  setOverview: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = (state, { activityIndex }) => {
  return {
    activity: selectActivityByIndex(state, { activityIndex }),
    adminCheck: state.apd.adminCheck
  };
};

const mapDispatchToProps = {
  setAlternatives: setActivityAlternatives,
  setDescription: setActivityDescription,
  setOverview: setActivityOverview
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityOverview);

export { ActivityOverview as plain, mapStateToProps, mapDispatchToProps };
