import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon, { faCode } from '../components/Icons';

class DataInspector extends Component {
  state = { hidden: true };

  handleClick = () => {
    this.setState(prev => ({ hidden: !prev.hidden }));
  };

  render() {
    const { data } = this.props;
    const { hidden } = this.state;

    return (
      <div>
        <div
          className={`p1 bg-black white h6 fixed right-0 top-0 bottom-0 overflow-auto z1 ${
            hidden ? 'display-none' : ''
          }`}
          style={{ width: 300 }}
        >
          <pre className="m0 mono">{JSON.stringify(data, null, 2)}</pre>
        </div>
        <button
          type="button"
          className={`btn btn-primary fixed bottom-0 right-0 m1 px1 py-tiny z2 ${
            hidden ? 'bg-black' : 'bg-yellow black'
          }`}
          onClick={this.handleClick}
        >
          <Icon icon={faCode} />
        </button>
      </div>
    );
  }
}

DataInspector.propTypes = {
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ data: state });

export default connect(mapStateToProps)(DataInspector);
