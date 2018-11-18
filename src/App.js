import React, { PureComponent, lazy, Suspense } from 'react'
import { Typography, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { onSubmitSignIn, onSubmitSignUp } from './helpers'
import Private, { LoggedInContext } from './components/Private'
import Header from './components/Header'
import Login from './components/Login'
const Todo = lazy(() => import('./components/Todo'))
const AppBar = lazy(() => import('./components/AppBar'))

const centerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center' }

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Header style={{ marginTop: 40 }}>
              <Login title="Sign In" redirectText="Sign up instead" onSubmit={onSubmitSignIn}>
                <Link to="/signup">
                  <Typography variant="overline" gutterBottom>
                    Sign up instead
                  </Typography>
                </Link>
              </Login>
            </Header>
          </Route>
          <Route path="/signup">
            <Header style={{ marginTop: 40 }}>
              <Login title="Sign Up" redirectText="Sign in instead" onSubmit={onSubmitSignUp}>
                <Link to="/signin">
                  <Typography variant="overline" gutterBottom>
                    Sign in instead
                  </Typography>
                </Link>
              </Login>
            </Header>
          </Route>
          <Private>
            <Route exact path="/">
              <LoggedInContext.Consumer>
                {({ user }) =>
                  user && user.uid ? (
                    <Suspense
                      fallback={
                        <div style={centerStyle}>
                          <CircularProgress style={{ marginTop: 60 }} />
                        </div>
                      }
                    >
                      <AppBar>
                        <Header>
                          <Todo user={user} />
                        </Header>
                      </AppBar>
                    </Suspense>
                  ) : null
                }
              </LoggedInContext.Consumer>
            </Route>
          </Private>
        </Switch>
      </Router>
    )
  }
}

export default React.memo(App)
