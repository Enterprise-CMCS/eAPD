import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import FormActivityGoals from '../components/FormActivityGoals';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

class ActivityGoals extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <FormLogger />
        <Heading mb={3}>
          Add goals and objectives for <em>Administration</em>
        </Heading>
        <FormActivityGoals onSubmit={this.showResults} />
        <PageNavButtons
          goTo={goTo}
          prev="/activity-overview"
          next="/activity-approach"
        />
      </Box>
    );
  }
}

ActivityGoals.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(withSidebar(ActivityGoals));
