import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodoById, toggleCompleted } from './todosSlice'
import { ReactComponent as TimesSolid } from './times-solid.svg'
import { availableColors, capitalize } from '../filters/colors'

const TodoListItem = ({ id }) => {
  const dispatch = useDispatch()
  const todo = useSelector(selectTodoById(id))
  const {text, completed, color} = todo

  const colorOptions = availableColors.map(color => (
    <option key={color} value={color}>
      {capitalize(color)}
    </option>
  ))

  const handleChanged = () => {
    dispatch(toggleCompleted(id, !completed))
  }
  const handleColorChanged = () => {

  }
  const onDelete = () => {

  }

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{color}}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
