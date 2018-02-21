import PropTypes from 'prop-types';
import React from 'react';
import { Button, Divider } from 'rebass';

import ButtonOutline from '../styles/ButtonOutline';

const PageNavButtons = ({ goTo, prev, next }) => (
  <div>
    <Divider my={4} color="gray2" />
    {prev && (
      <ButtonOutline mr={2} onClick={() => goTo(prev)}>
        Back
      </ButtonOutline>
    )}
    {next && <Button onClick={() => goTo(next)}>Continue</Button>}
  </div>
);

PageNavButtons.propTypes = {
  goTo: PropTypes.func.isRequired,
  prev: PropTypes.string,
  next: PropTypes.string
};

PageNavButtons.defaultProps = {
  prev: '',
  next: ''
};

export default PageNavButtons;
