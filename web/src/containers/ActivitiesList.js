import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link as RRLink } from 'react-router-dom';
import { push } from 'react-router-redux';
import {
  Absolute,
  Border,
  Box,
  Button,
  ButtonOutline,
  Heading,
  Link,
  Relative,
  Tooltip
} from 'rebass';
import { bindActionCreators } from 'redux';

// [Activity name, Link text, Link href]
// TODO(bren): update href for "Administration" entry once
// that page is created
const activities = [
  ['Administration', 'Start', '/activity-overview'],
  ['Designing and Building HIE System', 'Edit', '#!'],
  ['Technical Assistance', 'Start', '#!'],
  ['Outreach', 'Start', '#!']
];

const ActivitiesList = ({ goTo }) => (
  <Box py={4}>
    <Heading mb={3}>Activities</Heading>
    <Box mb={5}>
      {activities.map(([name, status, href]) => (
        <Border key={name} py={2} bottom>
          <Relative>
            <Absolute right>
              <Link to={href} is={RRLink}>
                {status}
              </Link>
            </Absolute>
            {name}
          </Relative>
        </Border>
      ))}
    </Box>
    <ButtonOutline mr={2} onClick={() => goTo('/activities-start')}>
      Back
    </ButtonOutline>
    <Tooltip text="Coming soon!">
      <Button>Add another activity</Button>
    </Tooltip>
  </Box>
);

ActivitiesList.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ActivitiesList);
