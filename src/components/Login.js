import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper, Snackbar } from '@material-ui/core'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
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
      <div>
        <Paper className={classes.paper}>
          <form onSubmit={this.onSubmit}>
            <div className="text-center">
              <h2>{this.props.title}</h2>
              {this.props.statusText && (
                <div className="alert alert-info">{this.props.statusText}</div>
              )}

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

export default withStyles(styles)(Login)
