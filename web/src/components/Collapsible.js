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
    const {
      bgColor,
      btnBgColor,
      btnColor,
      children,
      id,
      nested,
      sticky,
      title,
      onChange
    } = this.props;
    const isOpen = onChange ? this.props.open : this.state.open;
    const contentId = `collapsible-${kebabCase(title)}`;

    let btnClass = deline`
      btn block col-12 py2 h3 sm-h2 line-height-1 left-align
      ${isOpen ? 'border-bottom border-bottom-darken-1 rounded-top' : 'rounded'}
      bg-${btnBgColor} ${btnColor}
    `;

    // if nested, don't stick to top of window but right below parent header
    if (sticky) btnClass += ` ${nested ? 'sticky-nested' : 'sticky-header'}`;

    const bodyClass = deline`
      p2 ${!isOpen ? 'display-none' : ''} ${sticky ? 'has-sticky-header' : ''}
    `;

    return (
      <div id={id} className={`mb3 bg-${bgColor} rounded shadow`}>
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
        <div className={bodyClass} id={contentId}>
          {children}
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  bgColor: PropTypes.string,
  btnBgColor: PropTypes.string,
  btnColor: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  nested: PropTypes.bool,
  open: PropTypes.bool,
  sticky: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

Collapsible.defaultProps = {
  bgColor: 'white',
  btnBgColor: 'white',
  btnColor: 'blue',
  children: null,
  id: null,
  nested: false,
  open: false,
  sticky: true,
  onChange: null
};

export default Collapsible;
