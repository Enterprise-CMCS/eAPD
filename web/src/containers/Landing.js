import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { createApd, selectApd } from '../actions/apd';

class Landing extends Component {
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  createApd = e => {
    e.preventDefault();
    this.props.createApd();
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
        <a href="#!" onClick={this.createApd}>
          Create an APD
        </a>
        {apds.length > 0 && (
          <span>
            <h3>...or existing APDs:</h3>
            <ul>
              {apds.map(({ status, years, id }) => (
                <li key={id}>
                  <a href="#!" onClick={this.pickApd(id)}>
                    {status} APD{years
                      ? ` for ${years.join(', ')}`
                      : ' (years not defined yet)'}
                  </a>
                </li>
              ))}
            </ul>
          </span>
        )}
      </Fragment>
    );
  }
}

Landing.propTypes = {
  apds: PropTypes.array.isRequired,
  createApd: PropTypes.func.isRequired,
  selectApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd }) => ({ apds: Object.values(apd.byId) });

const mapDispatchToProps = { createApd, selectApd };

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
