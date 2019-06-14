import { Alert, Button } from '@cmsgov/design-system-core';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const FormAndReviewItem = ({
  collapsedComponent: Collapsed,
  expandedComponent: Expanded,
  initialCollapsed,
  ...rest
}) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const collapse = useCallback(() => setCollapsed(true), []);
  const expand = useCallback(() => setCollapsed(false), []);

  if (collapsed) {
    return (
      <div className="form-and-review-list-item--collapsed">
        <Collapsed {...rest} expand={expand} />
      </div>
    );
  }

  return (
    <div className="form-and-review-list-item--expanded">
      <Expanded {...rest} collapse={collapse} />
      <Button variation="primary" onClick={collapse}>
        Done
      </Button>
    </div>
  );
};

FormAndReviewItem.propTypes = {
  collapsedComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  expandedComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  initialCollapsed: PropTypes.bool
};

FormAndReviewItem.defaultProps = {
  initialCollapsed: true
};

const FormAndReviewList = ({
  addButtonText,
  collapsed,
  expanded,
  list,
  noDataMessage,
  onAddClick,
  onDeleteClick,
  ...rest
}) => (
  <div className="form-and-review-list">
    {list.length === 0 ? (
      <Alert variation="error">{noDataMessage || 'This list is empty'}</Alert>
    ) : (
      list.map((item, index) => (
        <FormAndReviewItem
          key={item.key}
          collapsedComponent={collapsed}
          expandedComponent={expanded}
          index={index}
          initialCollapsed={item.initialCollapsed}
          item={item}
          onDeleteClick={list.length > 1 ? () => onDeleteClick(item.key) : null}
          {...rest}
        />
      ))
    )}
    {onAddClick && (
      <Button className="visibility--screen" onClick={onAddClick}>
        {addButtonText || 'Add another'}
      </Button>
    )}
  </div>
);

FormAndReviewList.propTypes = {
  addButtonText: PropTypes.string,
  collapsed: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  list: PropTypes.array.isRequired,
  noDataMessage: PropTypes.string,
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

FormAndReviewList.defaultProps = {
  addButtonText: null,
  noDataMessage: null,
  onAddClick: null,
  onDeleteClick: null
};

export default FormAndReviewList;

export { FormAndReviewItem };
