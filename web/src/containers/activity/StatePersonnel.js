import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import { addPersonnel, removePersonnel } from '../../actions/editActivity';
import { selectActivityStatePersonnel } from '../../reducers/activities.selectors';
import { selectKeyPersonnel } from '../../reducers/apd.selectors';

import Instruction from '../../components/Instruction';
import { t } from '../../i18n';

import FormAndReviewList from '../../components/FormAndReviewList';
import { StatePersonForm, StatePersonReview } from './StatePerson';

const StatePersonnel = ({
  activityIndex,
  add,
  keyPersonnel,
  personnel,
  remove
}) => {
  const handleDelete = useCallback(key => {
    personnel.forEach(({ key: personnelKey }, i) => {
      if (personnelKey === key) {
        remove(activityIndex, i);
      }
    });
  });

  const handleAdd = useCallback(() => add(activityIndex));

  return (
    <Fragment>
      <Instruction source="activities.statePersonnel.instruction" />
      {activityIndex === 0 &&
        keyPersonnel.map(({ key, ...kp }) => (
          <StatePersonReview key={key} item={kp} />
        ))}
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText={t('activities.statePersonnel.addButtonText')}
        list={personnel}
        collapsed={StatePersonReview}
        expanded={StatePersonForm}
        noDataMessage={t('activities.statePersonnel.noDataNotice')}
        onAddClick={handleAdd}
        onDeleteClick={handleDelete}
      />
    </Fragment>
  );
};

StatePersonnel.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  keyPersonnel: PropTypes.array.isRequired,
  personnel: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  keyPersonnel:
    activityIndex === 0
      ? selectKeyPersonnel(state).map(
          ({ costs, key, name, percentTime, position }) => ({
            description: position,
            key,
            title: name,
            years: Object.keys(costs).reduce(
              (prev, year) => ({
                ...prev,
                [year]: { amt: costs[year], perc: +percentTime / 100 }
              }),
              {}
            )
          })
        )
      : [],
  personnel: selectActivityStatePersonnel(state, { activityIndex })
});

const mapDispatchToProps = {
  add: addPersonnel,
  remove: removePersonnel
};

export default connect(mapStateToProps, mapDispatchToProps)(StatePersonnel);

export { StatePersonnel as plain, mapStateToProps, mapDispatchToProps };
