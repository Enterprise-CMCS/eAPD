import React from 'react'
import { connect } from 'react-redux'

const ScrollToElement = ({ location }) => {
  const { hash } = location;

  window.scrollTo(0, 0)
  if (!hash) return null;

  setTimeout(() => {
    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (!element) return null;

    const elementPosition = element.getBoundingClientRect().top
    const headerOffset = document.getElementsByTagName('header')[0].offsetHeight

    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: 'smooth'
    })
  }, 0)

  return null;
}

const mapStateToProps = ({ router }) => ({
  location: router.location
})

export default connect(mapStateToProps)(ScrollToElement)
