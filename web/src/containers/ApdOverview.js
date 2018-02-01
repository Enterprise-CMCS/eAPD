import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Button, Divider, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import FormApdOverview from '../components/FormApdOverview';

class ApdOverview extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <Heading>Tell us more about your HITECH program</Heading>
        <FormApdOverview onSubmit={this.showResults} />
        <Divider my={4} color="gray2" />
        <Button onClick={() => goTo('/state-start')}>Continue</Button>
      </Box>
    );
  }
}

ApdOverview.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ApdOverview);
