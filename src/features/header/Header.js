import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { todoAdded } from '../todos/todosSlice'

const nextTodoId = todos => {
  const maxId = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1)
  return maxId + 1
}

const Header = () => {

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder='What needs to be done?'
        autoFocus={true}
      />
    </header>
  )
}

export default Header
