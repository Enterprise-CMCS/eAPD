import PropTypes from 'prop-types';
import React from 'react';

const PageNavButtons = ({ goTo, prev, next }) => (
  <div>
    <hr className="my3" />
    {prev && (
      <button
        type="button"
        className="btn btn-outline blue mr1"
        onClick={() => goTo(prev)}
      >
        Back
      </button>
    )}
    {next && (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => goTo(next)}
      >
        Continue
      </button>
    )}
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
