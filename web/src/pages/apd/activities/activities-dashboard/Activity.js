import { Button, Review } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useMemo, useRef, Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import { selectActivityByIndex } from '../../../../reducers/activities.selectors';
import { removeActivity } from '../../../../actions/editActivity';
import NavLink from '../../../../layout/nav/NavLink';

import { t } from '../../../../i18n';
import DeleteModal from '../../../../components/DeleteModal';

const makeTitle = ({ name, fundingSource }, i) => {
  let title = `${t('activities.namePrefix')} ${i}`;
  if (name) {
    title += `: ${name}`;
  } else {
    title += `: Untitled`;
  }
  if (fundingSource) {
    title += ` (${fundingSource})`;
  }
  return titleCase(title);
};

const EntryDetails = ({
  apdId,
  activityIndex,
  activityKey,
  fundingSource,
  name,
  remove
}) => {
  const container = useRef();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onRemove = () => {
    remove(activityIndex);
    setShowDeleteModal(false);
  };

  const title = useMemo(
    () => makeTitle({ name, fundingSource }, activityIndex + 1),
    [fundingSource, name, activityIndex]
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
      id={`activity-${activityKey}`}
      className={`activity--body activity--body__${
        activityIndex === 0 ? 'first' : 'notfirst'
      }`}
      ref={container}
    >
      <Review
        className="entry-details--review"
        heading={title}
        headingLevel="4"
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
  activityKey: PropTypes.string.isRequired,
  fundingSource: PropTypes.string,
  name: PropTypes.string,
  remove: PropTypes.func.isRequired
};

EntryDetails.defaultProps = {
  fundingSource: null,
  name: ''
};

const mapStateToProps = (state, { activityIndex }) => {
  const { fundingSource, key, name } = selectActivityByIndex(state, {
    activityIndex
  });
  return { activityKey: key, fundingSource, name };
};

const mapDispatchToProps = {
  remove: removeActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetails);

export { EntryDetails as plain, mapStateToProps, mapDispatchToProps };
