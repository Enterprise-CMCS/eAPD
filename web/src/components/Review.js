import { Button, Review } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const StandardReview = ({
  children,
  editHref,
  onDeleteClick,
  onEditClick,
  ...rest
}) => (
  <Review
    editContent={
      <div className="nowrap">
        <Button size="small" variation="transparent" onClick={onEditClick}>
          {// If the editHref is set, create a link element here so it'll
          // behave as intended on the outside.  Otherwise, the button
          // content can just be text.
          editHref ? <a href={editHref}>Edit</a> : 'Edit'}
        </Button>
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
  </Review>
);

StandardReview.propTypes = {
  children: PropTypes.node.isRequired,
  editHref: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func
};

StandardReview.defaultProps = {
  editHref: null,
  onDeleteClick: null,
  onEditClick: () => {}
};

export default StandardReview;
