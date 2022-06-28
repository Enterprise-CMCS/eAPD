import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

const AutoScrollToElement = ({ location, action }) => {
  const { hash } = location;

  React.useEffect(() => {
    if (action !== 'PUSH') return; // only execute on PUSH action
    window.scrollTo(0, 0);
    const element = hash ? document.querySelector(hash) : null;
    if (element) {
      element.scrollIntoView();
      window.scrollBy(0, -50); // compensate for header
    }
  }, [location, hash, action]);

  return null;
};

AutoScrollToElement.propTypes = {
  location: PropType.shape({
    hash: PropType.string
  }).isRequired,
  action: PropType.string.isRequired
};

const mapStateToProps = ({ router: { location = {}, action = '' } }) => ({
  location,
  action
});

export default connect(mapStateToProps)(AutoScrollToElement);

export { AutoScrollToElement as plain, mapStateToProps };
