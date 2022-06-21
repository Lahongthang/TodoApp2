import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoAdded } from '../todos/todosSlice'

const nextTodoId = todos => {
  const maxId = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1)
  return maxId + 1
}

const Header = () => {
  const [text, setText] = useState('')

  const handleChanged = (e) => {
    setText(e.target.value)
  }

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder='What needs to be done?'
        autoFocus={true}
        value={text}
        onChange={handleChanged}
      />
    </header>
  )
}

export default Header
