import { FormLabel } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import { connect } from 'react-redux';

import { t } from '../../i18n';
import { updateActivity as updateActivityAction } from '../../actions/activities';
import RichText from '../../components/RichText';
import Instruction from '../../components/Instruction';
import { Subsection } from '../../components/Section';
import TextArea from '../../components/TextArea';
import { selectActivityByKey } from '../../reducers/activities.selectors';

const Description = props => {
  const { activity, updateActivity } = props;
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
    ({ target: { value } }) => updateActivity(activity.key, { summary: value }),
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
      updateActivity(activity.key, { description: html });
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
      updateActivity(activity.key, { alternatives: html });
    },
    [activity.key]
  );

  return (
    <Subsection
      headerClassName="header-with-top-margin"
      resource="activities.overview"
      nested
    >
      <TextArea
        label={overviewLabel}
        hint={overviewHint}
        max={280}
        rows={6}
        className="data-entry-box"
        value={summary}
        onChange={overviewOnChange}
      />

      <div className="data-entry-box">
        <FormLabel className="ds-c-label--full-width" hint={descriptionHint}>
          {descriptionLabel}
        </FormLabel>
        {activity.fundingSource === 'HIE' && (
          <Instruction source="activities.overview.activityDescriptionInput.hie" />
        )}
        <RichText
          content={description}
          onSync={syncDescription}
          editorClassName="rte-textarea-l"
        />
      </div>

      <div className="data-entry-box">
        <FormLabel className="ds-c-label--full-width" hint={alternativesHint}>
          {alternativesLabel}
        </FormLabel>
        <Instruction source="activities.overview.activityAlternativesInput" />
        <RichText
          content={alternatives}
          onSync={syncAlternatives}
          editorClassName="rte-textarea-l"
        />
      </div>
      <hr />
    </Subsection>
  );
};

Description.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  activity: selectActivityByKey(state, props)
});

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
