import { FormLabel } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { t } from '../../../../i18n';
import {
  setActivityAlternatives,
  setActivityDescription,
  setActivityOverview
} from '../../../../redux/actions/editActivity';
import FundingSourceForm from './FundingSourceForm';
import Instruction from '../../../../components/Instruction';
import NameForm from './NameForm';
import RichText from '../../../../components/RichText';
import { selectAdminCheckEnabled } from '../../../../redux/selectors/apd.selectors';
import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';
import { Subsection } from '../../../../components/Section';

import { hitechActivityOverviewNoSCSchema as schema } from '@cms-eapd/common';

const HITECHOverview = ({
  activity,
  activityIndex,
  setAlternatives,
  setDescription,
  setOverview,
  adminCheck
}) => {
  const { activityOverview: { alternatives, description, summary } = {} } =
    activity;

  const {
    control,
    trigger,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      alternatives: alternatives,
      description: description,
      summary: summary
    },
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  const overviewLabel = t('activities.overview.activityOverviewInput.label', {
    defaultValue: 'Provide a short overview of the activity.'
  });

  const overviewHint = t('activities.overview.activityOverviewInput.hint', {
    defaultValue: ''
  });

  const descriptionLabel = t(
    `activities.overview.activityDescriptionInput.${
      activity.fundingSource === 'HIE' ? 'hie' : 'standard'
    }.label`,
    {
      defaultValue:
        'Include as much detail as is necessary to explain the activity.'
    }
  );
  const descriptionHint = t(
    `activities.overview.activityDescriptionInput.${
      activity.fundingSource === 'HIE' ? 'hie' : 'standard'
    }.hint`,
    {
      defaultValue: ''
    }
  );

  const alternativesLabel = t(
    'activities.overview.activityAlternativesInput.label',
    {
      defaultValue: 'Provide a short overview of the activity.'
    }
  );

  const alternativesHint = t(
    'activities.overview.activityAlternativesInput.hint',
    {
      defaultValue: ''
    }
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
        <Fragment>
          <NameForm
            index={activityIndex}
            item={{ name: activity.name }} // item is activity[index]
          />
          <FundingSourceForm
            index={activityIndex}
            item={{
              fundingSource: activity.fundingSource,
              name: activity.name
            }} // item is activity[index]
          />
        </Fragment>
      )}

      <div className="data-entry-box">
        <FormLabel
          id="label-for-summary"
          className="ds-c-label--full-width"
          hint={overviewHint}
          htmlFor="activity-short-overview-field"
        >
          {overviewLabel}
        </FormLabel>
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
              error={errors?.summary?.message}
            />
          )}
        />
      </div>

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
          render={({ field: { onChange } }) => (
            <RichText
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

HITECHOverview.propTypes = {
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
    adminCheck: selectAdminCheckEnabled(state)
  };
};

const mapDispatchToProps = {
  setAlternatives: setActivityAlternatives,
  setDescription: setActivityDescription,
  setOverview: setActivityOverview
};

export default connect(mapStateToProps, mapDispatchToProps)(HITECHOverview);

export { HITECHOverview as plain, mapStateToProps, mapDispatchToProps };
