import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const filterType = {
  all: false,
  completed: false,
  active: false
}

class Filters extends PureComponent {
  state = { filterType }

  onChange = (filterFunc, e) => {
    const { name } = e.target
    this.setState(
      {
        filterType: {
          ...filterType,
          [name]: true
        }
      },
      () => this.props.onChangeFilterFunc(filterFunc)
    )
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            name="all"
            className={this.state.filterType.all ? 'selected' : ''}
            onClick={this.onChange.bind(this, item => item)}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            name="active"
            className={this.state.filterType.active ? 'selected' : ''}
            onClick={this.onChange.bind(this, item => !item.isCompleted)}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            name="completed"
            className={this.state.filterType.completed ? 'selected' : ''}
            onClick={this.onChange.bind(this, item => item.isCompleted)}
          >
            Completed
          </a>
        </li>
      </ul>
    )
  }
}

Filters.propTypes = {
  onChangeFilterFunc: PropTypes.func.isRequired
}

export default Filters
