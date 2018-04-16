import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import tippy from 'tippy.js/dist/tippy.standalone';

const applyIfFunction = fn => (typeof fn === 'function' ? fn() : fn);

class Tooltip extends Component {
  componentDidMount() {
    this.initTippy();
  }

  componentDidUpdate(prevProps) {
    if (!this.tippy) return;

    // enable and disabled
    if (this.props.disabled === false && prevProps.disabled === true) {
      this.tippy.enable();
      return;
    }

    if (this.props.disabled === true && prevProps.disabled === false) {
      this.tippy.disable();
      return;
    }

    // open
    if (this.props.open === true && !prevProps.open) {
      setTimeout(() => {
        this.showTooltip();
      }, 0);
    }

    if (this.props.open === false && prevProps.open === true) {
      this.hideTooltip();
    }
  }

  componentWillUnmount() {
    this.destroyTippy();
  }

  showTooltip = () => {
    this.tippy.show();
  };

  hideTooltip = () => {
    this.tippy.hide();
  };

  contentRoot = () => {
    if (!this.contentRootEl && typeof window === 'object') {
      this.contentRootEl = window.document.createElement('div');
    }

    return this.contentRootEl;
  };

  initTippy = () => {
    const { animation, arrow, render, theme, title, ...rest } = this.props;
    this.tooltipDOM.setAttribute('title', title);

    tippy(this.tooltipDOM, {
      animation,
      arrow,
      theme,
      title,
      ...rest,
      html: render ? this.contentRoot() : undefined,
      dynamicTitle: true,
      performance: true
    });

    this.tippy = this.tooltipDOM._tippy; // eslint-disable-line no-underscore-dangle

    if (this.props.open) this.showTooltip();
  };

  destroyTippy = () => {
    this.tippy.hide();
    this.tippy.destroy();
    this.tippy = null;
  };

  render() {
    const { children, className, render, style, tabIndex, title } = this.props;

    return (
      <div
        ref={tooltip => {
          this.tooltipDOM = tooltip;
        }}
        title={title}
        className={className}
        tabIndex={tabIndex}
        style={{ display: 'inline', ...style }}
      >
        {children}
        {render && this.contentRoot()
          ? createPortal(applyIfFunction(render), this.contentRoot())
          : null}
      </div>
    );
  }
}

Tooltip.propTypes = {
  animation: PropTypes.string,
  arrow: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  open: PropTypes.bool,
  render: PropTypes.node,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  theme: PropTypes.string,
  title: PropTypes.string
};

Tooltip.defaultProps = {
  animation: 'fade',
  arrow: true,
  className: '',
  disabled: false,
  open: false,
  render: null,
  style: {},
  tabIndex: undefined,
  theme: 'light bordered',
  title: null
};

export default Tooltip;
