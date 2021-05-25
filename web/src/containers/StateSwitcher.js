import React from 'react'
import PropTypes from 'prop-types'

import CardForm from '../components/CardForm'


const StateSwitcher = ({
  value
}) => {
  return (
    <CardForm 
      title="yep" 
    >
      <h1>{value}</h1>
    </CardForm>
  )
}


StateSwitcher.propTypes = {
  value: PropTypes.string
}

StateSwitcher.defaultProps = {
  value: ''
}

export default StateSwitcher;

