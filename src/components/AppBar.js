import React, { PureComponent } from 'react'
import { firebaseAuth } from '../config/firebase'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Menu,
  MenuItem,
  Menu as MenuIcon,
  Typography,
  Toolbar
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class LoggedAppBar extends PureComponent {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  onSignOut = () => {
    firebaseAuth.signOut()
    this.handleClose()
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow} />

          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.onSignOut}>Sign out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
        {this.props.children}
      </>
    )
  }
}

LoggedAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoggedAppBar)
