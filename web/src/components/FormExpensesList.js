import PropTypes from 'prop-types';
import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import { Absolute, Box, Border, Heading, Link, Relative } from 'rebass';

import NavButton from './PageNavButtons';

const List = ({ goTo, next, prev }) => (
  <Box>
    <Heading mb={3}>Expenses</Heading>
    <Box mb={5}>
      <Border py={2} bottom>
        <Relative>
          <Absolute right>
            <Link to="#!" is={RRLink}>
              Edit
            </Link>
          </Absolute>
          Hardware, Software, and Licensing
        </Relative>
      </Border>

      <Border py={2} bottom>
        <Relative>
          <Absolute right>
            <Link to="#!" is={RRLink}>
              Edit
            </Link>
          </Absolute>
          State Travel
        </Relative>
      </Border>

      <Border py={2} bottom>
        <Relative>
          <Absolute right>
            <Link to="#!" is={RRLink}>
              Start
            </Link>
          </Absolute>
          Training and Outreach
        </Relative>
      </Border>

      <Border py={2} bottom>
        <Relative>
          <Absolute right>
            <Link to="/expenses-details/equipment-and-supplies" is={RRLink}>
              Start
            </Link>
          </Absolute>
          Equipment and Supplies
        </Relative>
      </Border>
    </Box>
    <NavButton goTo={goTo} next={next} prev={prev} />
  </Box>
);
List.propTypes = {
  goTo: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
  prev: PropTypes.string.isRequired
};

export default List;
