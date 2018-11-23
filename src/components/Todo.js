import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import '../todo.css'
import { connect } from 'react-redux'
import { getLocalIsoTime, addHoursToTime } from '../helpers'
import * as actions from '../actions/toDoListActions.js'
import TodoItem from './TodoItem'
import Filters from './Filters'
import { Tooltip } from '@material-ui/core'

class Todo extends PureComponent {
  state = {
    addInput: '',
    editInput: '',
    sortByPriority: false,
    filterBy: item => item
  }

  componentDidMount() {
    this.props.fetchToDos(this.props.user.uid)
  }

  onChange = ({ target }) => {
    const { name, value, type, checked } = target
    this.setState({
      [name]: type === 'checkbox' ? checked : value
    })
  }

  onAddItem = e => {
    e.preventDefault()
    this.props.addToDo(
      {
        value: this.state.addInput,
        isCompleted: false,
        isEditing: false,
        priority: 2,
        createdAt: getLocalIsoTime(),
        dueDate: this.defaultDueDate()
      },
      this.props.user.uid
    )
    this.setState({ addInput: '' })
  }

  defaultDueDate = () => {
    let now = new Date()
    return addHoursToTime(now, 1)
  }

  onUpdateItemValue = ({ id, ...item }) => this.props.updateToDo(id, item)

  onSortByPriority = (a, b) => b.priority - a.priority

  render() {
    const { toDoList } = this.props
    const { sortByPriority } = this.state
    if (!toDoList || !Array.isArray(toDoList)) return null
    return (
      <div>
        <form onSubmit={this.onAddItem}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            name="addInput"
            value={this.state.addInput}
            onChange={this.onChange}
            autoFocus={true}
          />
        </form>

        <section className="main">
          <label htmlFor="toggle-all" />
          <Tooltip title="Sort by priority">
            <input
              className="toggle-all"
              type="checkbox"
              name="sortByPriority"
              onChange={this.onChange}
            />
          </Tooltip>

          <ul className="todo-list">
            {toDoList
              .filter(this.state.filterBy)
              .sort(sortByPriority ? this.onSortByPriority : item => item)
              .map(item => (
                <TodoItem key={item.id} item={item} uid={this.props.user.uid} {...this.props} />
              ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{toDoList.filter(item => !item.isCompleted).length}</strong> left
          </span>

          <Filters onChangeFilterFunc={filter => this.setState({ filterBy: filter })} />
        </footer>
      </div>
    )
  }
}

Todo.propTypes = {
  addToDo: PropTypes.func.isRequired,
  updateToDo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  toDoList: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func
}

const mapStateToProps = ({ toDoList }) => ({ toDoList })
export default connect(
  mapStateToProps,
  actions
)(Todo)
