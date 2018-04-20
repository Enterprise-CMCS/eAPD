import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DataInspector from '../containers/DataInspector';

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
    const { children, isDev } = this.props;
    return (
      <div className="site">
        {children}
        {isDev && <DataInspector />}
      </div>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isDev: PropTypes.bool.isRequired
};

export default Wrapper;
