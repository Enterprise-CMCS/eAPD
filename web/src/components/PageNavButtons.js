import PropTypes from 'prop-types';
import React from 'react';
import { Button, ButtonOutline, Divider } from 'rebass';

const PageNavButtons = ({ goTo, prev, next }) => (
  <div>
    <Divider my={4} color="gray2" />
    {prev && (
      <ButtonOutline mr={2} onClick={() => goTo(prev)}>
        Back
      </ButtonOutline>
    )}
    <Button onClick={() => goTo(next)}>Continue</Button>
  </div>
);

PageNavButtons.propTypes = {
  goTo: PropTypes.func.isRequired,
  prev: PropTypes.string,
  next: PropTypes.string.isRequired
};

PageNavButtons.defaultProps = {
  prev: ''
};

export default PageNavButtons;
