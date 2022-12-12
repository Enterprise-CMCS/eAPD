import { FormLabel } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
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
import { Subsection } from '../../../../components/Section';
import { NameForm } from './NameAndFundingSource/';
import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';

import { mmisActivityOverviewSchema } from '@cms-eapd/common/schemas/activityOverview';

const ActivityOverview = ({
  activity,
  activityIndex,
  setProblemStatement,
  setProposedSolution,
  setSnapshot,
  adminCheck
}) => {
  ActivityOverview.displayName = 'ActivityOverview';

  const {
    activityOverview: {
      activitySnapshot,
      problemStatement,
      proposedSolution
    } = {}
  } = activity;

  const {
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
        defaultValue: 'Provide a brief and high-level snapshot of the activity.'
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
        defaultValue:
          'Provide a comprehensive explanation of the problem the state is faced with.'
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
        defaultValue:
          'Explain your proposed solution and how it addresses the state’s problem.'
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
    <>
      <Subsection
        headerClassName="header-with-top-margin"
        resource="activities.overview"
        id={`activity-overview-${activityIndex}`}
      >
        {activityIndex === 0 ? (
          <Fragment>
            <h4>Activity name: {activity.name || 'Untitled'}</h4>
          </Fragment>
        ) : (
          <NameForm
            index={activityIndex}
            item={{ name: activity.name }} // item is activity[index]
          />
        )}

        <div className="data-entry-box">
          <FormLabel
            className="ds-c-label--full-width"
            hint={snapshotHint}
            htmlFor="activity-snapshot-field"
          >
            {snapshotLabel}
          </FormLabel>
          <Instruction source="activities.overview.activitySnapshotInput" />
          <RichText
            id="activity-snapshot-field"
            iframe_aria_text="Activity Snapshot Text Area"
            content={activitySnapshot}
            onSync={html => {
              setSnapshot(activityIndex, html);
            }}
            editorClassName="rte-textarea-l"
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
          <RichText
            id="activity-problem-statement-field"
            iframe_aria_text="Problem Statement Text Area"
            content={problemStatement}
            onSync={html => {
              setProblemStatement(activityIndex, html);
            }}
            editorClassName="rte-textarea-l"
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
          <RichText
            id="activity-proposed-solution-field"
            iframe_aria_text="Proposed Solution Text Area"
            content={proposedSolution}
            onSync={html => {
              setProposedSolution(activityIndex, html);
            }}
            editorClassName="rte-textarea-l"
          />
        </div>
      </Subsection>
    </>
  );
};

ActivityOverview.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setAlternatives: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setOverview: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityOverview);

export { ActivityOverview as plain, mapStateToProps, mapDispatchToProps };
