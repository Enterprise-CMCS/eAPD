import React from 'react';
import { connect } from 'react-redux';

const AutoScrollToElement = ({ location }) => {
  const { hash } = location;

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const element = hash ? document.querySelector(hash) : null;
    if (element) {
      element.scrollIntoView();
      window.scrollBy(0, -50); // compensate for header
    }
  }, [location]); // execute when location changes

  return null;
};

const mapStateToProps = ({ router }) => ({
  location: router.location
});

export default connect(mapStateToProps)(AutoScrollToElement);

export { AutoScrollToElement as plain, mapStateToProps };
