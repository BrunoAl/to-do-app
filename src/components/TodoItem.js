import React, { PureComponent } from 'react'
import { Select, MenuItem, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

const getListStyle = ({ isCompleted, isEditing }) => {
  if (isCompleted) return 'completed'
  if (isEditing) return 'editing'
  return ''
}

const ENTER_KEY = 13
const priorities = [
  { level: 0, name: 'Lowest' },
  { level: 1, name: 'Low' },
  { level: 2, name: 'Medium' },
  { level: 3, name: 'High' },
  { level: 4, name: 'Highest' }
]

class TodoItem extends PureComponent {
  state = {
    editingValue: this.props.item.value,
    selectedPriority: 2
  }

  onChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  handleKeyDown = (item, e) => {
    if (e.which === ENTER_KEY) {
      this.onUpdateItemValue({ ...item, value: this.state.editingValue, isEditing: false })
    }
  }

  onChangePriority = (item, e) => {
    this.onUpdateItemValue({ ...item, priority: e.target.value })
  }

  onToggleItem = item =>
    this.props.updateToDo(item.id, { isCompleted: !item.isCompleted }, this.props.uid)

  onUpdateItemValue = ({ id, ...item }) => this.props.updateToDo(id, item, this.props.uid)

  prioritySelects = item => (
    <>
      <Select
        className="priority"
        value={item.priority}
        onChange={this.onChangePriority.bind(this, item)}
        inputProps={{
          name: 'priority'
        }}
      >
        {priorities.map(({ name, level }) => (
          <MenuItem key={level} value={level}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  )

  render() {
    const { item, uid } = this.props
    return (
      <li className={getListStyle(item)}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.isCompleted}
            onChange={this.onToggleItem.bind(this, item)}
          />
          <label onDoubleClick={this.props.toggleEditField.bind(this, item.id)}>{item.value}</label>
          {/* {this.prioritySelects(item)} */}
          <IconButton
            className="destroy"
            aria-owns={'menu-appbar'}
            aria-haspopup="true"
            onClick={() => this.props.removeToDo(item.id, uid)}
            color="inherit"
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <input
          className="edit"
          name="editingValue"
          //onBlur={this.props.toggleEditField.bind(this, item.id)}
          value={this.state.editingValue}
          onChange={this.onChange}
          onKeyDown={this.handleKeyDown.bind(this, item)}
        />
      </li>
    )
  }
}

export default React.memo(TodoItem)
