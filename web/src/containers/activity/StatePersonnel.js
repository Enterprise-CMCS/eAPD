import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import {
  addActivityStatePerson,
  removeActivityStatePerson,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import { selectActivityStatePersonnel } from '../../reducers/activities.selectors';

import Instruction from '../../components/Instruction';
import NoDataMsg from '../../components/NoDataMsg';
import { t } from '../../i18n';
import StatePerson from './StatePerson';

const StatePersonnel = ({
  activityKey,
  addPerson,
  personnel,
  removePerson,
  updateActivity
}) => {
  const getDeleteHandler = useCallback(
    key => () => {
      removePerson(activityKey, key);
    },
    []
  );

  const handleAdd = useCallback(() => addPerson(activityKey));

  const handleEditCost = useCallback((idx, year, amt) =>
    updateActivity(
      activityKey,
      {
        statePersonnel: { [idx]: { years: { [year]: { amt } } } }
      },
      true
    )
  );

  const handleEditFTE = useCallback((idx, year, perc) =>
    updateActivity(
      activityKey,
      {
        statePersonnel: { [idx]: { years: { [year]: { perc } } } }
      },
      true
    )
  );

  const handleEditPersonDesc = useCallback((idx, desc) => {
    updateActivity(activityKey, { statePersonnel: { [idx]: { desc } } });
  });

  const handleEditPersonTitle = useCallback((idx, title) => {
    updateActivity(activityKey, { statePersonnel: { [idx]: { title } } });
  });

  return (
    <Fragment>
      <Instruction source="activities.statePersonnel.instruction" />
      {personnel.length === 0 ? (
        <NoDataMsg>{t('activities.statePersonnel.noDataNotice')}</NoDataMsg>
      ) : (
        personnel.map((person, idx) => (
          <StatePerson
            key={person.key}
            handleDelete={getDeleteHandler(person.key)}
            handleEditCost={handleEditCost}
            handleEditFTE={handleEditFTE}
            handleEditPersonDesc={handleEditPersonDesc}
            handleEditPersonTitle={handleEditPersonTitle}
            idx={idx}
            title={person.title}
            desc={person.desc}
            years={person.years}
          />
        ))
      )}
      <Button
        className="ds-u-margin-top--2 visibility--screen"
        onClick={handleAdd}
      >
        {t('activities.statePersonnel.addButtonText')}
      </Button>
    </Fragment>
  );
};

StatePersonnel.propTypes = {
  activityKey: PropTypes.string.isRequired,
  addPerson: PropTypes.func.isRequired,
  personnel: PropTypes.array.isRequired,
  removePerson: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = (state, { aKey }) => ({
  activityKey: aKey,
  personnel: selectActivityStatePersonnel(state, aKey)
});

const mapDispatchToProps = {
  addPerson: addActivityStatePerson,
  removePerson: removeActivityStatePerson,
  updateActivity: updateActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatePersonnel);

export { StatePersonnel as plain, mapStateToProps, mapDispatchToProps };
