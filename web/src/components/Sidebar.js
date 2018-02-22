import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BlockLink, Box } from 'rebass';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/state-start', name: 'Start start' }
];

const Sidebar = ({ match }) => {
  console.log(match);

  return (
    <Box>
      {routes.map(({ path, name }) => (
        <BlockLink key={path} to={path} is={Link}>
          {name}
        </BlockLink>
      ))}
    </Box>
  );
};

Sidebar.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Sidebar);
