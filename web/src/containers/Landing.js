import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { createApd, selectApd } from '../actions/apd';
import Btn from '../components/Btn';
import Container from '../components/Container';
import Icon, { faSpinner } from '../components/Icons';

class Landing extends Component {
  createApd = () => {
    this.props.createApd();
  };

  pickApd = id => () => {
    this.props.selectApd(id);
  };

  render() {
    const { apds, fetching } = this.props;

    let content = (
      <Fragment>
        {apds.length > 0 && (
          <div>
            <h3>Manage an existing APD:</h3>
            {apds.map(({ status, years, id }) => (
              <Btn
                key={id}
                extraCss="mb1 h5 block pill"
                onClick={this.pickApd(id)}
              >
                {status} APD{years
                  ? ` for ${years.join(', ')}`
                  : ' (years not defined yet)'}
              </Btn>
            ))}
          </div>
        )}
        <hr />
        <Btn
          kind="outline"
          extraCss="bg-white blue pill"
          onClick={this.createApd}
        >
          Create new APD
        </Btn>
      </Fragment>
    );

    if (fetching) {
      content = (
        <Fragment>
          <Icon icon={faSpinner} spin size="sm" /> Loading APDs
        </Fragment>
      );
    }

    return (
      <Container>
        <div className="md-col-6 mx-auto">
          <h1>Welcome!</h1>
          {content}
        </div>
      </Container>
    );
  }
}

Landing.propTypes = {
  apds: PropTypes.array.isRequired,
  createApd: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,

  selectApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd }) => ({
  apds: Object.values(apd.byId),
  fetching: apd.fetching
});

const mapDispatchToProps = { createApd, selectApd };

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
