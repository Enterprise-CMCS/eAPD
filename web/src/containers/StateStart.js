import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Button, Divider } from 'rebass';
import { bindActionCreators } from 'redux';

import Form1 from '../components/Form1';

class StateStart extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <Form1 onSubmit={this.showResults} />

        <Divider my={4} />

        <Button onClick={() => goTo('/')}>Continue</Button>
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
