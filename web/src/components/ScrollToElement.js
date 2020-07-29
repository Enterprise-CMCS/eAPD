import React from 'react'
import { connect } from 'react-redux'

const ScrollToElement = ({ location }) => {
  const { hash } = location;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!hash) return;
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView();
      window.scrollBy(0, -50);  // compensate for header
    }
  }, [hash])

  return null;
}

const mapStateToProps = ({ router }) => ({
  location: router.location
})

export default connect(mapStateToProps)(ScrollToElement)

export { ScrollToElement as plain, mapStateToProps }
