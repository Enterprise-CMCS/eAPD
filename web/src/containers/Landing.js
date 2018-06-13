import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { selectApd } from '../actions/apd';

class Landing extends Component {
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  pickApd = id => e => {
    e.preventDefault();
    this.props.selectApd(id);
  };

  render() {
    const { apds } = this.props;
    return (
      <Fragment>
        <h1>Landing!</h1>
        {apds.map(({ status, years, id }) => (
          <div key={id}>
            <a href="#!" onClick={this.pickApd(id)}>
              {status} APD{years
                ? ` for ${years.join(', ')}`
                : ' (years not defined yet)'}
            </a>
          </div>
        ))}
      </Fragment>
    );
  }
}

Landing.propTypes = {
  apds: PropTypes.array.isRequired,
  selectApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd }) => ({ apds: Object.values(apd.byId) });

const mapDispatchToProps = { selectApd };

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
