import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const OopsMessage = () => (
  <div className="site-body ds-l-container">
    <main id="start-main-content">
      <div className="ds-u-padding-top--2">
        <h1 data-testid="errorboundary">
          Oops! Looks like something went wrong.
        </h1>
        <p>You might want to double-check your link and try again. (404)</p>
      </div>
    </main>
  </div>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <OopsMessage />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  hasError: PropTypes.bool
};

ErrorBoundary.defaultProps = {
  hasError: false
};

export default ErrorBoundary;
