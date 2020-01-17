import { Alert, Button } from '@cmsgov/design-system-core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const FormAndReviewItem = ({
  collapsedComponent: Collapsed,
  expandedComponent: Expanded,
  extraButtons,
  index,
  initialCollapsed,
  ...rest
}) => {
  const container = useRef(null);
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const collapse = useCallback(() => {
    const { top } = container.current.getBoundingClientRect();
    if (top < 0 || top > window.innerHeight) {
      container.current.scrollIntoView({ behavior: 'auto' });
      container.current.focus();
    }
    setCollapsed(true);
  }, []);
  const expand = useCallback(() => setCollapsed(false), []);

  if (collapsed) {
    return (
      <div ref={container} className="form-and-review-list--item__collapsed">
        <Collapsed index={index} {...rest} expand={expand} />
      </div>
    );
  }

  return (
    <div ref={container} className="form-and-review-list--item__expanded">
      <Expanded index={index} {...rest} collapse={collapse} />
      <Button variation="primary" onClick={collapse}>
        Done
      </Button>
      {extraButtons.map(({ onClick, text }) => (
        <Button className="ds-u-margin-left--2" onClick={() => onClick(index)}>
          {text}
        </Button>
      ))}
    </div>
  );
};

FormAndReviewItem.propTypes = {
  collapsedComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]).isRequired,
  expandedComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]).isRequired,
  extraButtons: PropTypes.array,
  index: PropTypes.number.isRequired,
  initialCollapsed: PropTypes.bool
};

FormAndReviewItem.defaultProps = {
  extraButtons: [],
  initialCollapsed: true
};

const FormAndReviewList = ({
  addButtonText,
  allowDeleteAll,
  className,
  collapsed,
  expanded,
  extraItemButtons,
  list,
  noDataMessage,
  onAddClick,
  onDeleteClick,
  ...rest
}) => {
  const combinedClassName = useMemo(
    () => ['form-and-review-list', className].join(' '),
    className
  );

  return (
    <div className={combinedClassName}>
      {list.length === 0 && noDataMessage !== false ? (
        <Alert variation="error">{noDataMessage || 'This list is empty'}</Alert>
      ) : (
        list.map((item, index) => (
          <FormAndReviewItem
            key={item.key}
            collapsedComponent={collapsed}
            expandedComponent={expanded}
            extraButtons={extraItemButtons}
            index={index}
            initialCollapsed={item.initialCollapsed}
            item={item}
            onDeleteClick={
              list.length > 1 || allowDeleteAll
                ? () => onDeleteClick(item.key)
                : null
            }
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
};

FormAndReviewList.propTypes = {
  addButtonText: PropTypes.string,
  allowDeleteAll: PropTypes.bool,
  className: PropTypes.string,
  collapsed: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
  extraItemButtons: PropTypes.array,
  list: PropTypes.array.isRequired,
  noDataMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

FormAndReviewList.defaultProps = {
  addButtonText: null,
  allowDeleteAll: false,
  className: null,
  extraItemButtons: [],
  noDataMessage: null,
  onAddClick: null,
  onDeleteClick: null
};

export default FormAndReviewList;

export { FormAndReviewItem };
