import React from 'react'
import { Typography } from '@material-ui/core'

export default function Header(props) {
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
