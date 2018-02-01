import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Button, Divider, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import Form4 from '../components/Form4';

class ActivitiesStart extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <Heading>Now let’s go over your program activities</Heading>
        <Form4 onSubmit={this.showResults} />
        <Divider my={4} color="gray2" />
        <Button onClick={() => goTo('/state-start')}>Continue</Button>
      </Box>
    );
  }
}

ActivitiesStart.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ActivitiesStart);
