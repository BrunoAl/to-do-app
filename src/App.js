import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Todo from './components/Todo'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Todo />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
