import { Button, Review as ReviewSummary } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

const Review = ({
  children,
  ariaLabel,
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
            <Button
              size="small"
              variation="transparent"
              onClick={editHandler}
              aria-label={`Edit${ariaLabel ? ` ${ariaLabel}` : ''}`}
            >
              {// If the editHref is set, create a link element here so it'll
              // behave as intended on the outside.  Otherwise, the button
              // content can just be text.
              editHref ? (
                <Link to={editHref} ref={anchor}>
                  Edit
                </Link>
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
                aria-label={`Delete${ariaLabel ? ` ${ariaLabel}` : ''}`}
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
  ariaLabel: PropTypes.string,
  editHref: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func
};

Review.defaultProps = {
  children: null,
  ariaLabel: null,
  editHref: null,
  onDeleteClick: null,
  onEditClick: null
};

export default Review;
