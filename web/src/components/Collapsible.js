import kebabCase from 'lodash.kebabcase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: !!props.open };
  }

  handleClick = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  render() {
    const { children, title } = this.props;
    const { isOpen } = this.state;

    const id = kebabCase(title);
    const innerCss = `p2 border border-silver ${isOpen ? '' : 'display-none'}`;

    return (
      <div className="mb2">
        <button
          type="button"
          className="btn bg-silver block col-12 left-align"
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={this.handleClick}
        >
          <span className="right">{isOpen ? '-' : '+'}</span>
          {title}
        </button>
        <div className={innerCss} id={id}>
          {children}
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

Collapsible.defaultProps = {
  children: null,
  open: false
};

export default Collapsible;
