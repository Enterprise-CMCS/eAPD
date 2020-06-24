import { Button, Review as ReviewSummary } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useRef } from 'react';

const Review = ({
  children,
  editHref,
  onDeleteClick,
  onEditClick,
  ...rest
}) => {
  // If there's an editHref, we need to catch the onEditClick event before
  // passing it along so we can be certain the link gets clicked. Otherwise,
  // a user could click in the button padding around the link and then the
  // link wouldn't get clicked.
  const anchor = useRef(null);
  const editHandler = useMemo(
    () => (...args) => {
      if (editHref) {
        anchor.current.click();
      }
      if (onEditClick) {
        onEditClick(...args);
      }
    },
    [editHref]
  );

  return (
    <ReviewSummary
      editContent={
        <div className="nowrap visibility--screen">
          {onEditClick || editHref ? (
            <Button size="small" variation="transparent" onClick={editHandler}>
              {// If the editHref is set, create a link element here so it'll
              // behave as intended on the outside.  Otherwise, the button
              // content can just be text.
              editHref ? (
                <a href={editHref} ref={anchor}>
                  Edit
                </a>
              ) : (
                'Edit'
              )}
            </Button>
          ) : null}
          {onDeleteClick && (
            // If there's a delete click handler, add a remove button to the
            // header area and wire it up
            <Fragment>
              |
              <Button
                size="small"
                variation="transparent"
                onClick={onDeleteClick}
              >
                Remove
              </Button>
            </Fragment>
          )}
        </div>
      }
      {...rest}
    >
      {children}
    </ReviewSummary>
  );
};

Review.propTypes = {
  children: PropTypes.node,
  editHref: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func
};

Review.defaultProps = {
  children: null,
  editHref: null,
  onDeleteClick: null,
  onEditClick: null
};

export default Review;
