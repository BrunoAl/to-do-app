import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper, Snackbar } from '@material-ui/core'

const styles = theme => ({
  root: {
    margin: 'auto',
    padding: 10,
    maxWidth: 500
  },
  paper: {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block'
  },
  button: {
    margin: 30
  }
})

class Login extends PureComponent {
  state = {
    email: '',
    password: '',
    redirectToReferrer: false,
    snackbarMessage: ''
  }

  onChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props
      .onSubmit(this.state.email, this.state.password)
      .then(() => {
        this.setState({ redirectToReferrer: true })
      })
      .catch(err => {
        this.setState({ snackbarMessage: err.message })
      })
  }

  render() {
    const { classes } = this.props

    if (this.state.redirectToReferrer) {
      return <Redirect to="/" />
    }
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.onSubmit}>
            <div className="text-center">
              <h2>{this.props.title}</h2>
              <div className="col-md-12">
                <TextField
                  label="Email"
                  name="email"
                  onChange={this.onChange}
                  style={{ margin: 8 }}
                  type="email"
                  margin="normal"
                />
              </div>
              <div className="col-md-12">
                <TextField
                  label="Password"
                  name="password"
                  onChange={this.onChange}
                  style={{ margin: 8 }}
                  type="password"
                  margin="normal"
                />
              </div>

              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                {this.props.title}
              </Button>

              {this.props.children}
            </div>
          </form>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          autoHideDuration={4000}
          message={<span>{this.state.snackbarMessage}</span>}
          open={this.state.snackbarMessage ? true : false}
          onClose={() => this.setState({ snackbarMessage: '' })}
        />
      </div>
    )
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default withStyles(styles)(Login)
