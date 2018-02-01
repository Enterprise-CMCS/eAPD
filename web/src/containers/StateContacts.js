import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Button, Divider, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import FormStateContacts from '../components/FormStateContacts';

class StateContacts extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <Heading>Review your state contact information</Heading>
        <FormStateContacts onSubmit={this.showResults} />
        <Divider my={4} color="gray2" />
        <Button onClick={() => goTo('/apd-overview')}>Continue</Button>
      </Box>
    );
  }
}

StateContacts.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(StateContacts);
