import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper, Snackbar, CircularProgress } from '@material-ui/core'

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
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: 10,
    position: 'relative',
  }
})

class Login extends PureComponent {
  state = {
    email: '',
    password: '',
    redirectToReferrer: false,
    snackbarMessage: '',
    isSubmitting: false
  }

  onChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState({ isSubmitting: true })
    this.props
      .onSubmit(this.state.email, this.state.password)
      .then(() => {
        this.setState({ redirectToReferrer: true, isSubmitting: false })
      })
      .catch(err => {
        this.setState({ snackbarMessage: err.message, isSubmitting: false })
      })
  }

  render() {
    const { classes } = this.props
    const { isSubmitting } = this.state

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

              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={isSubmitting}
                >
                  {this.props.title}
                </Button>
                {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
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
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(Login)
