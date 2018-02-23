import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import FormActivitiesStart from '../components/FormActivitiesStart';
import PageNavButtons from '../components/PageNavButtons';
import FormLogger from '../util/formLogger';
import withSidebar from '../components/withSidebar';

class ActivitiesStart extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <FormLogger />
        <Heading mb={3}>Now let’s go over your program activities</Heading>
        <FormActivitiesStart onSubmit={this.showResults} />
        <PageNavButtons
          goTo={goTo}
          prev="/apd-overview"
          next="/activities-list"
        />
      </Box>
    );
  }
}

ActivitiesStart.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(withSidebar(ActivitiesStart));
