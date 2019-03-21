import deline from 'deline';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Icon, { faChevronDown, faChevronUp } from './Icons';

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
      open: openProp,
      sticky,
      title,
      onChange
    } = this.props;
    const { open: openState } = this.state;

    const isOpen = onChange ? openProp : openState;
    const replaceSpaces = / /g;
    const removeColon = /:/g;
    const removeCarat = /›/g;
    const slug = `${title.replace(replaceSpaces, '-').replace(removeColon, '').replace(removeCarat, '').toLowerCase()}`;
    const contentId = `collapsible-${slug}`;

    let btnClass = deline`
      btn btn-collapse block col-12 py2 sm-px3 h3 sm-h2 line-height-1 left-align
      ${isOpen ? 'border-bottom border-bottom-darken-1 rounded-top' : 'rounded'}
      bg-${btnBgColor} ${btnColor}
    `;

    // if nested, don't stick to top of window but right below parent header
    if (sticky) btnClass += ` ${nested ? 'sticky-nested' : 'sticky-header'}`;

    const bodyClass = deline`
      p2 sm-p3 ${!isOpen ? 'd-none' : ''} ${sticky ? 'has-sticky-header' : ''}
    `;

    return (
      <div id={id} className={`mb3 bg-${bgColor} rounded shadow accordian`}>
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
