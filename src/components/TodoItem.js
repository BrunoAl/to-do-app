import React, { PureComponent } from 'react'

const getListStyle = ({isCompleted, isEditing}) => {
  if (isCompleted) return 'completed'
  if (isEditing) return 'editing'
  return ''
}

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

class TodoItem extends PureComponent {

  state = {
    editingValue: this.props.item.value
  }

  handleKeyDown = event => {
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props.item.value});
      this.props.onEditItem()
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  render() {
    const {item, onToggleItem} = this.props
    return (
      <li className={getListStyle(item)}>
        <div className="view">
          <input className="toggle" type="checkbox"
            checked={item.isCompleted} onChange={onToggleItem.bind(this, item.id)}
          />
          <label onDoubleClick={this.props.onEditItem}>
            {item.value}
          </label>
          <button className="destroy" onClick={() => {}} />
        </div>
        <input
          className="edit"
          value={this.state.editingValue}
          //onBlur={this.handleSubmit}
          //onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    )
  }
}

export default React.memo(TodoItem)