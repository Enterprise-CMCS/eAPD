import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Heading } from 'rebass';
import { bindActionCreators } from 'redux';
import FormLogger from '../util/formLogger';

import FormStateStart from '../components/FormStateStart';
import PageNavButtons from '../components/PageNavButtons';

class StateStart extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <FormLogger />
        <Heading mb={3}>Let’s start by setting up your state profile</Heading>
        <FormStateStart onSubmit={this.showResults} />
        <PageNavButtons goTo={goTo} next="/state-contacts" />
      </Box>
    );
  }
}

StateStart.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(StateStart);
