import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Icon, { faPrint } from './Icons';

class Wrapper extends Component {
  state = { printPreview: false };

  componentDidMount() {
    if (!this.props.isDev) return;
    this.addTota11y();
  }

  addTota11y = () => {
    const script = document.createElement('script');
    script.src = '/_dev/tota11y.min.js';
    document.body.appendChild(script);
  };

  render() {
    const { children } = this.props;
    const { printPreview } = this.state;
    const cls = `site ${printPreview ? 'print-preview' : ''}`.trim();

    return (
      <div className={cls}>
        {children}
        <button
          type="button"
          className={`btn btn-primary fixed bottom-0 right-0 m1 px1 py-tiny z2 ${
            printPreview ? 'bg-green' : 'bg-black white'
          }`}
          onClick={() =>
            this.setState(prev => ({ printPreview: !prev.printPreview }))
          }
        >
          <Icon icon={faPrint} />
        </button>
      </div>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isDev: PropTypes.bool.isRequired
};

export default Wrapper;
