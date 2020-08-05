import React from 'react';
import { connect } from 'react-redux';

const AutoScrollToElement = ({ hash, pathname }) => {

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const element = hash ? document.querySelector(hash) : null;
    if (element) {
      element.scrollIntoView();
      window.scrollBy(0, -50); // compensate for header
    }
  }, [pathname]); // execute when pathname changes

  return null;
};

const mapStateToProps = ({ router: { location } }) => ({
  hash: location.hash,
  pathname: location.pathname
});

export default connect(mapStateToProps)(AutoScrollToElement);

export { AutoScrollToElement as plain, mapStateToProps };
