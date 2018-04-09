import kebabCase from 'lodash.kebabcase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';

import { faChevronDown, faChevronUp } from './Icons';

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: !!props.open };
  }

  handleClick = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  render() {
    const { bgColor, children, title } = this.props;
    const { isOpen } = this.state;

    const id = kebabCase(title);

    return (
      <div className={`mb2 bg-${bgColor} border border-silver`}>
        <button
          type="button"
          className="btn block col-12 left-align h3 py2 line-height-1"
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={this.handleClick}
        >
          <span className="right">
            {isOpen ? (
              <Icon icon={faChevronUp} size="sm" />
            ) : (
              <Icon icon={faChevronDown} size="sm" />
            )}
          </span>
          {title}
        </button>
        <div className={`p2 ${isOpen ? '' : 'display-none'}`} id={id}>
          {children}
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

Collapsible.defaultProps = {
  bgColor: 'white',
  children: null,
  open: false
};

export default Collapsible;
