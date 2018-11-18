import React, { PureComponent } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  Divider
} from '@material-ui/core'
import TaskProgress from './TaskProgress'

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

const styles = {
  column: {
    flexBasis: '33.33%'
  },
  textField: {
    marginRight: 50,
    width: 200,
    paddingBottom: 15
  }
}

class TodoItem extends PureComponent {
  state = {
    editingValue: this.props.item.value,
    selectedPriority: 2
  }

  handleKeyDown = (item, e) => {
    if (e.which === ENTER_KEY) {
      this.onUpdateItemValue({ ...item, value: this.state.editingValue, isEditing: false })
    }
  }

  onChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  onUpdateItemValue = ({ id, ...item }) => this.props.updateToDo(id, item, this.props.uid)

  onChangePriority = (item, e) => this.onUpdateItemValue({ ...item, priority: e.target.value })

  onChangeDueDate = (item, e) => this.onUpdateItemValue({ ...item, dueDate: e.target.value })

  onToggleItem = item => this.onUpdateItemValue({ ...item, isCompleted: !item.isCompleted })

  render() {
    const { item, uid, classes } = this.props

    return (
      <li className={getListStyle(item)}>
        <ExpansionPanel>
          <input
            className="toggle"
            style={{ paddingLeft: 20 }}
            type="checkbox"
            checked={item.isCompleted}
            onChange={this.onToggleItem.bind(this, item)}
          />

          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className="view">
              <label
                className="toggleble-label"
                onDoubleClick={this.props.toggleEditField.bind(this, item.id)}
              >
                {item.value}
              </label>
            </div>
            <input
              className="edit"
              name="editingValue"
              value={this.state.editingValue}
              onChange={this.onChange}
              onKeyDown={this.handleKeyDown.bind(this, item)}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column} />

            <div className={classNames(classes.column, classes.helper)}>
              <TaskProgress item={item} />
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <TextField
              id="datetime-local"
              label="Due Date"
              type="datetime-local"
              name="dueDate"
              onChange={this.onChangeDueDate.bind(this, item)}
              defaultValue={item.dueDate}
              className={classes.textField}
            />
            <TextField
              value={item.priority}
              label="Priority"
              onChange={this.onChangePriority.bind(this, item)}
              id="standard-select-currency-native"
              select
              className={classes.textField}
            >
              {priorities.map(({ name, level }) => (
                <option key={level} value={level}>
                  {name}
                </option>
              ))}
            </TextField>
            <IconButton
              aria-owns={'menu-appbar'}
              aria-haspopup="true"
              onClick={() => this.props.removeToDo(item.id, uid)}
              color="inherit"
            >
              <DeleteIcon />
            </IconButton>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </li>
    )
  }
}

export default withStyles(styles)(React.memo(TodoItem))
