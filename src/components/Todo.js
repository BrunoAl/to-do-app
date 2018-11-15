import React, { PureComponent } from 'react'
import uniqid from 'uniqid'
import TodoItem from './TodoItem'
import Filters from './Filters'

export default class Todo extends PureComponent {
  state = {
    addInput: '',
    todoItems: [],
    filterBy: item => item
  }

  onChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  onAddItem = e => {
    e.preventDefault()
    this.setState(state => ({
      todoItems: [
        ...state.todoItems,
        {
          value: state.addInput,
          isCompleted: false,
          isEditing: false,
          id: uniqid()
        }
      ],
      addInput: ''
    }))
  }

  onRemoveItem = id => {
    this.setState(state => ({
      todoItems: [...state.todoItems.filter(item => item.id !== id)]
    }))
  }

  onToggleItem = id => {
    this.setState(state => ({
      todoItems: [
        ...state.todoItems.map(item =>
          item.id !== id
            ? item
            : {
                ...item,
                isCompleted: !item.isCompleted
              }
        )
      ]
    }))
  }

  onEditItem = id => {
    this.setState(state => ({
      todoItems: [
        ...state.todoItems.map(item =>
          item.id !== id
            ? item
            : {
                ...item,
                isEditing: !item.isEditing
              }
        )
      ]
    }))
  }

  onEditItem = id => {
    this.setState(state => ({
      todoItems: [
        ...state.todoItems.map(item =>
          item.id !== id
            ? item
            : {
                ...item,
                isEditing: false
              }
        )
      ]
    }))
  }

  onClearCompletedItems = () => {
    this.setState(state => ({
      todoItems: [...state.todoItems.filter(item => !item.isCompleted)]
    }))
  }

  render() {
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
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
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" />

          <ul className="todo-list">
            {this.state.todoItems.filter(this.state.filterBy).map(item => (
              <TodoItem
                key={item.id}
                item={item}
                onToggleItem={this.onToggleItem}
                onEditItem={this.onEditItem.bind(this, item.id)}
                //onCancelEditing={this.onCancelEditingItem.bind(this, item.id)}
              />
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{this.state.todoItems.filter(item => !item.isCompleted).length}</strong> left
          </span>

          <Filters onChangeFilterFunc={filter => this.setState({ filterBy: filter })} />

          <button className="clear-completed" onClick={this.onClearCompletedItems}>
            Clear completed
          </button>
        </footer>
      </div>
    )
  }
}
