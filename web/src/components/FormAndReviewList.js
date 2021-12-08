import { Alert, Button } from '@cmsgov/design-system';
import React, { useCallback, useMemo, useRef, createRef, useState } from 'react';
import PropTypes from 'prop-types';

const FormAndReviewItem = ({
  collapsedComponent: Collapsed,
  expandedComponent: Expanded,
  extraButtons,
  index,
  initialExpanded,
  onCancel,
  onDoneClick,
  ...rest
}) => {
  
  const container = useRef(null);
  const formRef = createRef();
  
  const [collapsed, setCollapsed] = useState(!initialExpanded);
  const collapse = useCallback(() => {
    const { top } = container.current.getBoundingClientRect();
    if (top < 0 || top > window.innerHeight) {
      container.current.scrollIntoView({ behavior: 'auto' });
      container.current.focus();
    }
    setCollapsed(true);
  }, []);
  const expand = useCallback(() => setCollapsed(false), []);
  
  // const onDone = (e) => {
  //   e.preventDefault();
  //   console.log("onDone called with event:", e);
  // }

  if (collapsed) {
    return (
      <div ref={container} className="form-and-review-list--item__collapsed">
        <Collapsed index={index} {...rest} expand={expand} />
      </div>
    );
  }

  return (
    <div ref={container} className="form-and-review-list--item__expanded">
      <Expanded index={index} {...rest} collapse={collapse} ref={formRef} />
      <Button
        onClick={() => onCancel(index)}
        className="ds-u-margin-right--2"
      >
        Cancel
      </Button>
      <Button
        id="form-and-review-list--done-btn"
        variation="primary"
        // type="submit"
        onClick={(event) => formRef.submit(event)}
      >
        Done
      </Button>
      {extraButtons.map(({ onClick, text }) => (
        <Button
          key={text}
          className="ds-u-margin-left--2"
          onClick={() => onClick(index)}
        >
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
  initialExpanded: PropTypes.bool
};

FormAndReviewItem.defaultProps = {
  extraButtons: [],
  initialExpanded: true
};

const FormAndReviewList = ({
  createNew,
  addButtonText,
  allowDeleteAll,
  className,
  collapsed,
  expanded,
  extraItemButtons,
  list,
  noDataMessage,
  onDoneClick,
  onAddClick,
  onDeleteClick,
  onCancelClick,
  ...rest
}) => {
  const combinedClassName = useMemo(
    () => ['form-and-review-list', className].join(' '),
    className
  );

  const [hasAdded, setHasAdded] = useState(false);
  
  const [localList, setLocalList] = useState(list);
  
  const addClick = e => {
    setHasAdded(true);
    const newListItem = createNew([2022], false);
    setLocalList([...localList, newListItem]);
  };
  
  const cancelClick = index => {
    const removed = localList.splice(index, index);
    setLocalList(removed);
  }

  return (
    <div className={combinedClassName}>
      {localList.length === 0 && noDataMessage !== false ? (
        <Alert variation="error">{noDataMessage || 'This list is empty'}</Alert>
      ) : (
        localList.map((item, index) => (
          <FormAndReviewItem
            key={item.key}
            collapsedComponent={collapsed}
            expandedComponent={expanded}
            extraButtons={extraItemButtons}
            index={index}
            initialExpanded={hasAdded && index === localList.length - 1}
            item={item}
            onCancel={cancelClick}
            onDoneClick={onDoneClick}
            onDeleteClick={
              list.length > 1 || allowDeleteAll
                ? () => onDeleteClick(index)
                : null
            }
            {...rest}
          />
        ))
      )}
      <Button className="visibility--screen" onClick={addClick}>
        {addButtonText || 'Add another'}
      </Button>
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
