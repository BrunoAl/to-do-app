import { FETCH_TODOS, TOGGLE_EDIT_FIELD, EDIT_FIELD_VALUE } from '../actions/toDoListActions.js'

export const toDoList = (state = [], actions) => {
  switch (actions.type) {
    case FETCH_TODOS:
      return actions.todos && Object.keys(actions.todos)
        ? Object.keys(actions.todos).map(key => ({ ...actions.todos[key], id: key }))
        : []
    case TOGGLE_EDIT_FIELD:
      return [
        ...state.map(item =>
          item.id !== actions.id
            ? item
            : {
                ...item,
                isEditing: !item.isEditing
              }
        )
      ]
    case EDIT_FIELD_VALUE:
      return [
        ...state.map(item =>
          item.id !== actions.payload.id
            ? item
            : {
                ...item,
                value: actions.payload.value
              }
        )
      ]
    default:
      return state
  }
}
