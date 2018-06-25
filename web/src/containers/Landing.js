import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createApd, selectApd } from '../actions/apd';
import Container from '../components/Container';

class Landing extends Component {
  createApd = () => {
    this.props.createApd();
  };

  pickApd = id => () => {
    this.props.selectApd(id);
  };

  render() {
    const { apds } = this.props;

    return (
      <Container>
        <div className="md-col-6 mx-auto">
          <h1>Welcome!</h1>
          {apds.length > 0 && (
            <div>
              <h3>Manage an existing APD:</h3>
              {apds.map(({ status, years, id }) => (
                <button
                  key={id}
                  type="button"
                  className="block mb1 btn btn-primary btn-pill bg-black h5"
                  onClick={this.pickApd(id)}
                >
                  {status} APD{years
                    ? ` for ${years.join(', ')}`
                    : ' (years not defined yet)'}
                </button>
              ))}
            </div>
          )}
          <hr />
          <button
            type="button"
            className="btn btn-outline btn-pill blue"
            onClick={this.createApd}
          >
            Create new APD
          </button>
        </div>
      </Container>
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
