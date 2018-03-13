import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { fetchStateDataIfNeeded, updateState } from '../actions/state';
import FormApdOverview from '../components/FormApdOverview';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

class ApdOverview extends Component {
  componentDidMount() {
    this.props.fetchStateDataIfNeeded();
  }

  updateForm = data => {
    const { id } = this.props.stateInfo;
    this.props.updateState(id, data);
  };

  render() {
    const { goTo, formData, stateInfo } = this.props;

    return (
      <div>
        <FormLogger />
        <h1>Tell us more about your HITECH program</h1>
        {!stateInfo.loaded ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <FormApdOverview
              initialValues={formData}
              onSubmit={this.updateForm}
            />
            <PageNavButtons
              goTo={goTo}
              prev="/state-contacts"
              next="/activities-start"
            />
          </Fragment>
        )}
      </div>
    );
  }
}

ApdOverview.propTypes = {
  goTo: PropTypes.func.isRequired,
  fetchStateDataIfNeeded: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  stateInfo: PropTypes.object.isRequired
};

const mapStateToProps = ({ state }) => {
  const { id, program_vision, program_benefits } = state.data; // eslint-disable-line camelcase

  return {
    formData: {
      program_vision: program_vision || '', // eslint-disable-line camelcase
      program_benefits: program_benefits || '' // eslint-disable-line camelcase
    },
    stateInfo: { loaded: state.loaded, id }
  };
};

const mapDispatchToProps = {
  goTo: push,
  fetchStateDataIfNeeded,
  updateState
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSidebar(ApdOverview)
);

export { ApdOverview as RawApdOverview, mapStateToProps, mapDispatchToProps };
