import { FormLabel } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { t } from '../../../../i18n';
import {
  setActivityProblemStatement,
  setActivityProposedSolution,
  setActivitySnapshot
} from '../../../../redux/actions/editActivity';
import RichText from '../../../../components/RichText';
import Instruction from '../../../../components/Instruction';
import NameForm from './NameForm';
import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';
import { Subsection } from '../../../../components/Section';

import { mmisActivityOverviewSchema } from '@cms-eapd/common/schemas/activityOverview';

const MMISActivityOverview = ({
  activity,
  activityIndex,
  setProblemStatement,
  setProposedSolution,
  setSnapshot,
  adminCheck
}) => {
  const {
    activityOverview: {
      activitySnapshot,
      problemStatement,
      proposedSolution
    } = {}
  } = activity;

  const {
    control,
    trigger,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      activitySnapshot: activitySnapshot,
      problemStatement: problemStatement,
      proposedSolution: proposedSolution
    },
    resolver: joiResolver(mmisActivityOverviewSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  const snapshotLabel = useMemo(
    () =>
      t('activities.overview.activitySnapshotInput.label', {
        defaultValue: 'Activity snapshot'
      }),
    []
  );

  const snapshotHint = useMemo(
    () =>
      t('activities.overview.activitySnapshotInput.hint', {
        defaultValue: ''
      }),
    []
  );

  const problemStatementLabel = useMemo(
    () =>
      t('activities.overview.problemStatementInput.label', {
        defaultValue: 'Problem statement'
      }),
    []
  );

  const problemStatementHint = useMemo(
    () =>
      t('activities.overview.problemStatementInput.hint', {
        defaultValue: ''
      }),
    []
  );

  const proposedSolutionLabel = useMemo(
    () =>
      t('activities.overview.proposedSolutionInput.label', {
        defaultValue: 'Proposed solution'
      }),
    []
  );

  const proposedSolutionHint = useMemo(
    () =>
      t('activities.overview.proposedSolutionInput.hint', {
        defaultValue: ''
      }),
    []
  );

  return (
    <Fragment>
      <Subsection
        headerClassName="header-with-top-margin"
        resource="activities.overview"
        id={`activity-overview-${activityIndex}`}
      >
        <NameForm
          index={activityIndex}
          item={{ name: activity.name }} // item is activity[index]
        />
        <div className="data-entry-box">
          <FormLabel
            className="ds-c-label--full-width"
            hint={snapshotHint}
            htmlFor="activity-snapshot-field"
          >
            {snapshotLabel}
          </FormLabel>
          <Instruction source="activities.overview.activitySnapshotInput" />
          <Controller
            name="activitySnapshot"
            control={control}
            render={({ field: { onChange } }) => (
              <RichText
                id="activity-snapshot-field"
                iframe_aria_text="Activity Snapshot Text Area"
                content={activitySnapshot}
                onSync={html => {
                  setSnapshot(activityIndex, html);
                  onChange(html);

                  if (adminCheck) {
                    trigger();
                  }
                }}
                data-cy="activity-snapshot"
                editorClassName="rte-textarea-l"
                error={errors?.activitySnapshot?.message}
              />
            )}
          />
        </div>
      </Subsection>
      <Subsection
        headerClassName="header-with-top-margin"
        resource="activities.comprehensiveOverview"
        id={`activity-comprehensive-overview-${activityIndex}`}
      >
        <div className="data-entry-box">
          <FormLabel
            className="ds-c-label--full-width"
            hint={problemStatementHint}
            htmlFor="activity-problem-statement-field"
          >
            {problemStatementLabel}
          </FormLabel>
          <Instruction source="activities.comprehensiveOverview.problemStatementInput" />
          <Controller
            name="problemStatement"
            control={control}
            render={({ field: { onChange } }) => (
              <RichText
                id="activity-problem-statement-field"
                iframe_aria_text="Problem Statement Text Area"
                content={problemStatement}
                onSync={html => {
                  setProblemStatement(activityIndex, html);
                  onChange(html);

                  if (adminCheck) {
                    trigger();
                  }
                }}
                data-cy="activity-problem-statement"
                editorClassName="rte-textarea-l"
                error={errors?.problemStatement?.message}
              />
            )}
          />
        </div>

        <div className="data-entry-box">
          <FormLabel
            className="ds-c-label--full-width"
            hint={proposedSolutionHint}
            htmlFor="activity-proposed-solution-field"
          >
            {proposedSolutionLabel}
          </FormLabel>
          <Instruction source="activities.comprehensiveOverview.proposedSolutionInput" />
          <Controller
            name="proposedSolution"
            control={control}
            render={({ field: { onChange } }) => (
              <RichText
                id="activity-proposed-solution-field"
                iframe_aria_text="Proposed Solution Text Area"
                content={proposedSolution}
                onSync={html => {
                  setProposedSolution(activityIndex, html);
                  onChange(html);

                  if (adminCheck) {
                    trigger();
                  }
                }}
                data-cy="activity-proposed-solution"
                editorClassName="rte-textarea-l"
                error={errors?.proposedSolution?.message}
              />
            )}
          />
        </div>
      </Subsection>
    </Fragment>
  );
};

MMISActivityOverview.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setProblemStatement: PropTypes.func.isRequired,
  setProposedSolution: PropTypes.func.isRequired,
  setSnapshot: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = (state, { activityIndex }) => {
  return {
    activity: selectActivityByIndex(state, { activityIndex }),
    adminCheck: state.apd.adminCheck?.enabled
  };
};

const mapDispatchToProps = {
  setProblemStatement: setActivityProblemStatement,
  setProposedSolution: setActivityProposedSolution,
  setSnapshot: setActivitySnapshot
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MMISActivityOverview);

export { MMISActivityOverview as plain, mapStateToProps, mapDispatchToProps };
