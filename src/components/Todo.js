import React, { PureComponent } from 'react'
import '../todo.css'
import { connect } from 'react-redux'
import * as actions from '../actions/toDoListActions.js'
import TodoItem from './TodoItem'
import Filters from './Filters'

class Todo extends PureComponent {
  state = {
    addInput: '',
    editInput: '',
    filterBy: item => item
  }

  componentDidMount() {
    this.props.fetchToDos(this.props.user.uid)
  }

  onChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  onAddItem = e => {
    e.preventDefault()
    this.props.addToDo(
      {
        value: this.state.addInput,
        isCompleted: false,
        isEditing: false,
        priority: 2
      },
      this.props.user.uid
    )
    this.setState({ addInput: '' })
  }

  onUpdateItemValue = ({ id, ...item }) => this.props.updateToDo(id, item)

  render() {
    const { toDoList } = this.props
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
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" />

          <ul className="todo-list">
            {toDoList.filter(this.state.filterBy).map(item => (
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

const mapStateToProps = ({ toDoList }) => ({ toDoList })
export default connect(
  mapStateToProps,
  actions
)(Todo)
