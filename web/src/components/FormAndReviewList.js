import { Alert, Button } from '@cmsgov/design-system';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const FormAndReviewItem = ({
  collapsedComponent: Collapsed,
  expandedComponent: Expanded,
  index,
  initialExpanded,
  item,
  onCancelClick,
  ...rest
}) => {
  const container = useRef(null);
  const formRef = useRef(null);

  const [collapsed, setCollapsed] = useState(!initialExpanded);
  const [isFormValid, setFormValid] = useState(true);
  const collapse = useCallback(() => {
    const { top } = container.current.getBoundingClientRect();
    if (top < 0 || top > window.innerHeight) {
      container.current.scrollIntoView({ behavior: 'auto' });
      container.current.focus();
    }
    setCollapsed(true);
  }, []);

  const expand = useCallback(() => setCollapsed(false), []);

  const handleCancel = () => {
    onCancelClick();
    collapse();
  };

  if (collapsed) {
    return (
      <div ref={container} className="form-and-review-list--item__collapsed">
        <Collapsed index={index} item={item} {...rest} expand={expand} />
      </div>
    );
  }

  return (
    <div ref={container} className="form-and-review-list--item__expanded">
      <Expanded
        index={index}
        ref={formRef}
        item={item}
        {...rest}
        collapse={collapse}
        setFormValid={setFormValid}
      />
      <Button onClick={() => handleCancel()} className="ds-u-margin-right--2">
        Cancel
      </Button>
      <Button
        id="form-and-review-list--done-btn"
        variation="primary"
        disabled={!isFormValid}
        onClick={() => {
          collapse();
          formRef.current.click();
        }}
      >
        Save
      </Button>
    </div>
  );
};

FormAndReviewItem.propTypes = {
  collapsedComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]).isRequired,
  expandedComponent: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  initialExpanded: PropTypes.bool,
  onCancelClick: PropTypes.func,
  item: PropTypes.object.isRequired
};

FormAndReviewItem.defaultProps = {
  initialExpanded: true,
  onCancelClick: null
};

const FormAndReviewList = ({
  addButtonText,
  allowDeleteAll,
  className,
  collapsed,
  errorCheck,
  expanded,
  list,
  noDataMessage,
  onAddClick,
  onCancelClick,
  onDeleteClick,
  ...rest
}) => {
  const [hasAdded, setHasAdded] = useState(false);

  const combinedClassName = useMemo(
    () => ['form-and-review-list', className].join(' '),
    [className]
  );

  const noDataOptions = noDataMessage || 'This list is empty';

  const addClick = () => {
    setHasAdded(true);
    onAddClick();
  };

  return (
    <div className={combinedClassName}>
      {list.length === 0 && noDataMessage !== false ? (
        <div>
          {errorCheck === true ? (
            <Alert variation="error">{noDataOptions}</Alert>
          ) : (
            <p className="ds-u-margin-top--4">{noDataOptions}</p>
          )}
        </div>
      ) : (
        list.map((item, index) => (
          <FormAndReviewItem
            key={item.key}
            collapsedComponent={collapsed}
            expandedComponent={expanded}
            index={index}
            initialExpanded={hasAdded && index === list.length - 1}
            item={item}
            onDeleteClick={
              list.length > 1 || allowDeleteAll
                ? () => onDeleteClick(index)
                : null
            }
            onCancelClick={onCancelClick}
            {...rest}
          />
        ))
      )}
      {onAddClick && (
        <Button className="visibility--screen" onClick={addClick}>
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
  errorCheck: PropTypes.bool,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
  list: PropTypes.array.isRequired,
  noDataMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onCancelClick: PropTypes.func
};

FormAndReviewList.defaultProps = {
  addButtonText: null,
  allowDeleteAll: false,
  className: null,
  errorCheck: false,
  noDataMessage: null,
  onAddClick: null,
  onDeleteClick: null,
  onCancelClick: null
};

export default FormAndReviewList;

export { FormAndReviewItem };
