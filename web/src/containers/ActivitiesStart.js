import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Button, ButtonOutline, Divider, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import FormActivitiesStart from '../components/FormActivitiesStart';

class ActivitiesStart extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <Heading mb={3}>Now let’s go over your program activities</Heading>
        <FormActivitiesStart onSubmit={this.showResults} />
        <Divider my={4} color="gray2" />
        <ButtonOutline onClick={() => goTo('/apd-overview')}>
          Back
        </ButtonOutline>{' '}
        <Button onClick={() => goTo('/state-personnel')}>Continue</Button>
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
