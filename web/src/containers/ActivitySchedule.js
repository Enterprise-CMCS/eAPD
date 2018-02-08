import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Button, Divider, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import FormActivitySchedule from '../components/FormActivitySchedule';
import ButtonOutline from '../styles/ButtonOutline';
import FormLogger from '../util/formLogger';

class ActivitySchedule extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <FormLogger />
        <Heading mb={3}>Tell us about the schedule for Administration</Heading>
        <FormActivitySchedule onSubmit={this.showResults} />
        <Divider my={4} color="gray2" />
        <ButtonOutline onClick={() => goTo('/state-start')}>
          Back
        </ButtonOutline>{' '}
        <Button onClick={() => goTo('/apd-overview')}>Continue</Button>
      </Box>
    );
  }
}

ActivitySchedule.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ActivitySchedule);
