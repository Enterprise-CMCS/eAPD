import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.initialExpanded
    };
  }

  toggle = () => {
    this.setState(prev => ({ expanded: !prev.expanded }));
  };

  render() {
    const { children, deleteItem, header } = this.props;

    const childClass = this.state.expanded ? '' : 'd-none';

    return (
      <Fragment>
        <div className="mb1 h5 flex justify-between">
          <button
            type="button"
            className={`btn btn-no-focus p1 flex-auto left-align bg-blue-light ${
              deleteItem ? 'rounded-left' : 'rounded'
            }`}
            onClick={this.toggle}
          >
            <header className="flex items-center justify-between">
              {header}
            </header>
          </button>
          {deleteItem && (
            <button
              type="button"
              onClick={() => deleteItem()}
              className="btn btn-no-focus p1 bg-blue-light rounded-right"
            >
              ✗
            </button>
          )}
        </div>
        <div className={childClass}>{children}</div>
      </Fragment>
    );
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  deleteItem: PropTypes.func,
  header: PropTypes.node.isRequired,
  initialExpanded: PropTypes.bool
};

ListItem.defaultProps = {
  children: null,
  deleteItem: null,
  initialExpanded: false
};

const CollapsibleList = ({ content, deleteItem, getKey, header, items }) => (
  <div>
    {items.map((item, i) => (
      <ListItem
        key={getKey(item, i)}
        deleteItem={deleteItem ? () => deleteItem(item, i) : null}
        initialExpanded={i === items.length - 1}
        header={header(item, i)}
      >
        {content(item, i)}
      </ListItem>
    ))}
  </div>
);

CollapsibleList.propTypes = {
  content: PropTypes.func.isRequired,
  deleteItem: PropTypes.func,
  getKey: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

CollapsibleList.defaultProps = {
  deleteItem: null
};

export default CollapsibleList;
