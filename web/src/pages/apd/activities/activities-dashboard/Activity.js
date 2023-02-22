import { Button, Review } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useMemo, useRef, Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';
import { removeActivity } from '../../../../redux/actions/editActivity';
import { selectApdType } from '../../../../redux/selectors/apd.selectors';
import NavLink from '../../../../layout/nav/NavLink';

import { t } from '../../../../i18n';
import DeleteModal from '../../../../components/DeleteModal';

const makeTitle = ({ name, fundingSource, apdType }, i) => {
  let title = `${t('activities.namePrefix')} ${i}`;
  if (name) {
    title += `: ${name}`;
  } else {
    title += `: Untitled`;
  }
  if (fundingSource && apdType === 'HITECH') {
    title += ` (${fundingSource})`;
  }
  return titleCase(title);
};

const EntryDetails = ({
  apdId,
  activityIndex,
  activityId,
  fundingSource,
  name,
  remove,
  apdType
}) => {
  const container = useRef();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onRemove = () => {
    remove(activityIndex);
    setShowDeleteModal(false);
  };

  const title = useMemo(
    () => makeTitle({ name, fundingSource, apdType }, activityIndex + 1),
    [fundingSource, name, activityIndex, apdType]
  );

  const editContent = (
    <div className="nowrap visibility--screen">
      <Button
        aria-label={`Edit: ${title}`}
        size="small"
        variation="transparent"
        component={NavLink}
        href={`/apd/${apdId}/activity/${activityIndex}/overview`}
      >
        Edit
      </Button>
      {activityIndex > 0 && (
        <Fragment>
          <span>|</span>
          <Button
            aria-label={`Delete: ${title}`}
            className="ds-u-color--error"
            size="small"
            variation="transparent"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </Fragment>
      )}
    </div>
  );

  return (
    <div
      id={`activity-${activityId}`}
      className={`activity--body activity--body__${
        activityIndex === 0 ? 'first' : 'notfirst'
      }`}
      ref={container}
    >
      <Review
        className="entry-details--review"
        heading={title}
        headingLevel="3"
        editContent={editContent}
      >
        {
          [
            /* children are required, so send an empty array to suppress errors */
          ]
        }
      </Review>
      {showDeleteModal && (
        <DeleteModal
          objType="Activity"
          onCancel={() => setShowDeleteModal(false)}
          onDelete={onRemove}
          objTitle={name}
        />
      )}
    </div>
  );
};

EntryDetails.propTypes = {
  apdId: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  activityId: PropTypes.string.isRequired,
  fundingSource: PropTypes.string,
  name: PropTypes.string,
  remove: PropTypes.func.isRequired,
  apdType: PropTypes.string
};

EntryDetails.defaultProps = {
  fundingSource: null,
  name: ''
};

const mapStateToProps = (state, { activityIndex }) => {
  const { fundingSource, activityId, name } = selectActivityByIndex(state, {
    activityIndex
  });
  const apdType = selectApdType(state);
  return { activityId: activityId, fundingSource, name, apdType };
};

const mapDispatchToProps = {
  remove: removeActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetails);

export { EntryDetails as plain, mapStateToProps, mapDispatchToProps };
