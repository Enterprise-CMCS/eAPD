import deline from 'deline';
import kebabCase from 'lodash.kebabcase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';

import { faChevronDown, faChevronUp } from './Icons';

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = { open: props.open };
  }

  handleClick = () => {
    this.setState(prev => ({ open: !prev.open }));
  };

  render() {
    const { bgColor, children, id, sticky, title, onChange } = this.props;
    const isOpen = onChange ? this.props.open : this.state.open;
    const contentId = kebabCase(title);

    const btnClass = deline`
      btn block col-12 py2 h3 line-height-1 left-align
      ${isOpen ? 'border-bottom border-bottom-silver' : ''}
      bg-${bgColor} ${sticky ? 'sticky-top' : ''}
    `;

    return (
      <div id={id} className={`mb2 bg-${bgColor} border border-silver`}>
        <button
          type="button"
          className={btnClass}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onChange || this.handleClick}
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
        <div className={`p2 ${isOpen ? '' : 'display-none'}`} id={contentId}>
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
  sticky: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

Collapsible.defaultProps = {
  bgColor: 'white',
  children: null,
  id: null,
  open: false,
  sticky: false,
  onChange: null
};

export default Collapsible;
