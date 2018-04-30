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
    const { bgColor, children, id, title } = this.props;
    const { isOpen } = this.state;

    const contentId = kebabCase(title);

    return (
      <div id={id} className={`mb2 bg-${bgColor} border border-silver`}>
        <button
          type="button"
          className="btn block col-12 left-align h3 py2 line-height-1"
          aria-expanded={isOpen}
          aria-controls={contentId}
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
        <div
          className={`p2 border-top border-silver ${
            isOpen ? '' : 'display-none'
          }`}
          id={contentId}
        >
          {children}
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

Collapsible.defaultProps = {
  bgColor: 'white',
  children: null,
  id: null,
  open: false
};

export default Collapsible;
