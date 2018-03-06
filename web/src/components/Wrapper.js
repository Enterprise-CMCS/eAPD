import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Wrapper extends Component {
  componentDidMount() {
    if (!this.props.isDev) return;
    this.addTota11y();
  }

  addTota11y = () => {
    const script = document.createElement('script');
    script.src = '_dev/tota11y.min.js';
    document.body.appendChild(script);
  };

  render() {
    const { children } = this.props;
    return <div className="site">{children}</div>;
  }
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isDev: PropTypes.bool.isRequired
};

export default Wrapper;
