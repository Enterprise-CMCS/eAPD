import { Button, Review } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ActivityDialog from './EntryDetailsDialog';
import { jumpTo } from '../../actions/app';
import { selectActivityByIndex } from '../../reducers/activities.selectors';

import { t } from '../../i18n';

const makeTitle = ({ name, fundingSource }, i) => {
  let title = `${t('activities.namePrefix')} ${i}`;
  if (name) {
    title += `: ${name}`;
  }
  if (fundingSource) {
    title += ` (${fundingSource})`;
  }
  return title;
};

const EntryDetails = ({
  activityIndex,
  fundingSource,
  jumpTo: jumpAction,
  activityKey,
  name
}) => {
  const container = useRef();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const goToActivity = () => {
    jumpAction(activityKey);
    history.push(`/apd/activity/${activityIndex}`);
  };

  const title = useMemo(
    () => makeTitle({ name, fundingSource }, activityIndex + 1),
    [fundingSource, name, activityIndex]
  );

  const editContent = (
    <div className="nowrap visibility--screen">
      <Button size="small" variation="transparent" onClick={goToActivity}>
        Edit
      </Button>
    </div>
  );

  return (
    <div
      id={`activity-${activityKey}`}
      className={`activity--body activity--body__${
        activityIndex === 0 ? 'first' : 'notfirst'
      }`}
      ref={container}
    >
      <Review heading={title} headingLevel={4} editContent={editContent}>
        {[
          /* children are required, so send an empty array to suppress errors */
        ]}
      </Review>
      {showModal && (
        <ActivityDialog
          title={title}
          activityIndex={activityIndex}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

EntryDetails.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  activityKey: PropTypes.string.isRequired,
  fundingSource: PropTypes.string.isRequired,
  name: PropTypes.string
};

EntryDetails.defaultProps = {
  name: ''
};

const mapStateToProps = (state, { activityIndex }) => {
  const { fundingSource, key, name } = selectActivityByIndex(state, {
    activityIndex
  });
  return { activityKey: key, fundingSource, name };
};

const mapDispatchToProps = { jumpTo };

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetails);

export { EntryDetails as plain, mapStateToProps };
