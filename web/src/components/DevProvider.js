import PropTypes from 'prop-types';
import React, { Component } from 'react';
import XRay from 'react-x-ray';
import { Button, Fixed, Provider } from 'rebass';

class DevProvider extends Component {
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
      <Provider>
        <XRay disabled={!xray}>{children}</XRay>
        <Fixed m={2} z={1} right bottom>
          <Button px={2} bg="black" onClick={this.toggleXray}>
            X-Ray
          </Button>
        </Fixed>
      </Provider>
    );
  }
}

DevProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default DevProvider;
