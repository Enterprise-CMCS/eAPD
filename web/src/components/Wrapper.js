import PropTypes from 'prop-types';
import React, { Component } from 'react';
import XRay from 'react-x-ray';

class DevWrapper extends Component {
  state = { xray: false };

  componentDidMount() {
    this.addTota11y();
  }

  addTota11y = () => {
    const script = document.createElement('script');
    script.src = '_dev/tota11y.min.js';
    document.body.appendChild(script);
  };

  toggleXray = () => {
    this.setState(prev => ({ xray: !prev.xray }));
  };

  render() {
    const { children } = this.props;
    const { xray } = this.state;

    return (
      <div className="site">
        <XRay disabled={!xray}>{children}</XRay>
        <div className="fixed m1 z1 bottom-0 right-0">
          <button
            type="button"
            className="btn btn-primary bg-black px1"
            onClick={this.toggleXray}
          >
            X-Ray
          </button>
        </div>
      </div>
    );
  }
}

DevWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

const ProdWrapper = ({ children }) => <div className="site">{children}</div>;

ProdWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

const Wrapper =
  process.env.NODE_ENV !== 'production' ? DevWrapper : ProdWrapper;

export default Wrapper;
