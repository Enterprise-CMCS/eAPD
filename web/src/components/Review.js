import { Button, Review as ReviewSummary } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const Review = ({
  children,
  ariaLabel,
  objType,
  title,
  editHref,
  onDeleteClick,
  onEditClick,
  onDeleteLabel,
  skipConfirmation,
  ...rest
}) => {
  // If there's an editHref, we need to catch the onEditClick event before
  // passing it along so we can be certain the link gets clicked. Otherwise,
  // a user could click in the button padding around the link and then the
  // link wouldn't get clicked.
  const anchor = useRef(null);
  const editHandler = useMemo(
    () =>
      (...args) => {
        if (editHref) {
          anchor.current.click();
        }
        if (onEditClick) {
          onEditClick(...args);
        }
      },
    [editHref, onEditClick]
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onRemove = () => {
    onDeleteClick();
    setShowDeleteModal(false);
  };

  const handleDeleteClick = () => {
    if (skipConfirmation) {
      onDeleteClick();
    } else {
      setShowDeleteModal(true);
    }
  };

  return (
    <ReviewSummary
      editContent={
        <div className="nowrap visibility--screen ds-u-margin-top--2">
          {onEditClick || editHref ? (
            <Button
              size="small"
              variation="transparent"
              onClick={editHandler}
              aria-label={`Edit${ariaLabel ? ` ${ariaLabel}` : ''}`}
            >
              {
                // If the editHref is set, create a link element here so it'll
                // behave as intended on the outside.  Otherwise, the button
                // content can just be text.
                editHref ? (
                  <Link to={editHref} ref={anchor}>
                    Edit
                  </Link>
                ) : (
                  'Edit'
                )
              }
            </Button>
          ) : null}
          {onDeleteClick && (
            // If there's a delete click handler, add a remove button to the
            // header area and wire it up
            <Fragment>
              {onEditClick && <strong>|</strong>}
              <Button
                size="small"
                variation="transparent"
                onClick={handleDeleteClick}
                aria-label={`Delete${ariaLabel ? ` ${ariaLabel}` : ''}`}
                className="ds-u-color--error"
              >
                {onDeleteLabel || 'Delete'}
              </Button>
            </Fragment>
          )}
        </div>
      }
      {...rest}
    >
      {children}
      {showDeleteModal && (
        <DeleteModal
          objType={objType}
          objTitle={title}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={onRemove}
        />
      )}
    </ReviewSummary>
  );
};

Review.propTypes = {
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
  objType: PropTypes.string,
  title: PropTypes.string,
  editHref: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteLabel: PropTypes.string,
  skipConfirmation: PropTypes.bool
};

Review.defaultProps = {
  children: null,
  ariaLabel: null,
  objType: null,
  title: null,
  editHref: null,
  onDeleteClick: null,
  onEditClick: null,
  onDeleteLabel: null,
  skipConfirmation: false
};

export default Review;
