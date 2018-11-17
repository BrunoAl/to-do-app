import { todosRef, firebaseDB } from '../config/firebase'

export const FETCH_TODOS = 'FETCH_TODOS'
export const TOGGLE_EDIT_FIELD = 'TOGGLE_EDIT_FIELD'
export const EDIT_FIELD_VALUE = 'EDIT_FIELD_VALUE'

export const fetchToDos = uid => async dispatch => {
  if (!uid) return
  todosRef
    .child(uid)
    .child('todos')
    .on('value', snapshot => {
      dispatch({
        type: FETCH_TODOS,
        todos: snapshot.val()
      })
    })
}

export const addToDo = (newToDo, uid) => async () => {
  todosRef
    .child(uid)
    .child('todos')
    .push()
    .set(newToDo)
}

export const removeToDo = (id, uid) => async () => {
  firebaseDB.ref(`${uid}/todos/${id}`).remove()
}

export const updateToDo = (id, params, uid) => async () => {
  firebaseDB.ref(`${uid}/todos/${id}`).update(params)
}

export const toggleEditField = id => {
  return {
    type: TOGGLE_EDIT_FIELD,
    id
  }
}

export const editFieldValue = (id, value) => {
  return {
    type: EDIT_FIELD_VALUE,
    payload: { id, value }
  }
}
