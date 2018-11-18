import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

function Header(props) {
  return (
    <>
      <header className="header" {...props}>
        <Typography component="h2" variant="h2" gutterBottom align={'center'}>
          Todos
        </Typography>
      </header>
      {props.children}
    </>
  )
}

Header.propTypes = {
  children: PropTypes.element
}

export default Header