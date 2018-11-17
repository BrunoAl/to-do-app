import React, { PureComponent } from 'react'
import { firebaseAuth } from '../config/firebase'
import { Redirect } from 'react-router-dom'

export const LoggedInContext = React.createContext({ user: null })

class Private extends PureComponent {
  state = { user: {} }

  componentDidMount() {
    this.authListener()
  }

  authListener = () => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  render() {
    if (this.state.user) {
      return (
        <LoggedInContext.Provider value={{ user: this.state.user }}>
          {this.props.children}
        </LoggedInContext.Provider>
      )
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      )
    }
  }
}

export default Private
