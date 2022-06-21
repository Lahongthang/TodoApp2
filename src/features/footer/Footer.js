import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { availableColors, capitalize } from '../filters/colors'

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const Footer = () => {

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">
          Mark All Completed
        </button>
        <button className="button">
          Clear Completed
        </button>
      </div>
    </footer>
  )
}

export default Footer
