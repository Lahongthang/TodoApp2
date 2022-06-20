import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectTodos, todoAdded } from '../todos/todosSlice'

const nextTodoId = todos => {
  const maxId = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1)
  return maxId + 1
}

const Header = () => {
  const [text, setText] = useState('')
  // const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const todos = useSelector(selectTodos)

  const handleChange = (e) => setText(e.target.value)

  const handleKeyDown = async (e) => {
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
      const id = nextTodoId(todos)
      const todo = {color: '', completed: false, id, text: trimmedText}
      dispatch(todoAdded(todo))
      setText('')
    }
  }

  // let isLoading = status === 'loading'
  // let placeholder = isLoading ? '' : 'What needs to be done?'
  // let loader = isLoading ? <div className="loader" /> : null

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder='What needs to be done?'
        autoFocus={true}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        // disabled={isLoading}
      />
      {/* {loader} */}
    </header>
  )
}

export default Header
