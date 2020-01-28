import { TextField } from '@cmsgov/design-system-core';

import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  setObjective as setObjectiveAction,
  setObjectiveKeyResult,
  setObjectiveKeyResultTarget,
  setObjectiveKeyResultBaseline
} from '../../../actions/editActivity';

const ObjectiveAndKeyResultForm = ({
  activityIndex,
  item: { keyResults, objective },
  index,
  setBaseline,
  setKR,
  setObjective,
  setTarget
}) => {
  const changeObjective = useMemo(
    () => ({ target: { value } }) => {
      setObjective(activityIndex, index, value);
    },
    [index]
  );

  const changeKeyResult = i => ({ target: { value } }) => {
    setKR(activityIndex, index, i, value);
  };

  const changeTarget = i => ({ target: { value } }) => {
    setTarget(activityIndex, index, i, value);
  };

  const changeBaseline = i => ({ target: { value } }) => {
    setBaseline(activityIndex, index, i, value);
  };

  return (
    <Fragment>
      <TextField
        autoFocus
        name="objective"
        className="data-entry-box"
        label="Objective"
        hint="Describe what you are trying to achieve"
        value={objective}
        onChange={changeObjective}
      />

      {keyResults.map(({ key, keyResult, target, baseline }, i) => (
        <div
          key={key}
          className="ds-c-choice__checkedChild ds-u-margin-top--3 ds-u-padding-top--0"
        >
          <TextField
            name="key-result"
            label="Key result"
            hint="Describe how you will measure progress towards achieving your objective."
            value={keyResult}
            onChange={changeKeyResult(i)}
          />
          <TextField
            name="kr-target"
            className="data-entry-box"
            label="Target"
            hint="Provide a numerical measure for your key result if applicable."
            value={target}
            onChange={changeTarget(i)}
          />
          <TextField
            name="kr-baseline"
            className="data-entry-box"
            label="Baseline"
            hint="Provide where you are with this goal now if applicable. Use the same units as your target."
            value={baseline}
            onChange={changeBaseline(i)}
          />
        </div>
      ))}
    </Fragment>
  );
};

ObjectiveAndKeyResultForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    keyResults: PropTypes.array,
    objective: PropTypes.string
  }).isRequired,
  setObjective: PropTypes.func.isRequired,
  setKR: PropTypes.func.isRequired,
  setTarget: PropTypes.func.isRequired,
  setBaseline: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setObjective: setObjectiveAction,
  setKR: setObjectiveKeyResult,
  setTarget: setObjectiveKeyResultTarget,
  setBaseline: setObjectiveKeyResultBaseline
};

export default connect(null, mapDispatchToProps)(ObjectiveAndKeyResultForm);

export { ObjectiveAndKeyResultForm as plain, mapDispatchToProps };
