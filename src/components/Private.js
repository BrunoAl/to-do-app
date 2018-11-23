import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { firebaseAuth } from '../config/firebase'
import { Redirect } from 'react-router-dom'

export const LoggedInContext = React.createContext({ user: null })

class Private extends PureComponent {
  _isMounted = false
  state = { user: {} }

  componentDidMount() {
    this._isMounted = true
    this.authListener()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  authListener = () => {
    firebaseAuth.onAuthStateChanged(user => {
      if (!this._isMounted) return
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

Private.propTypes = {
  children: PropTypes.element
}

export default Private
