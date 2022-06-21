import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodos, selectTodoIds } from './todosSlice'

const TodoList = () => {
    const state = useSelector(state => state)
    const todos = useSelector(selectTodos)
    const todoIds = useSelector(selectTodoIds)

    console.log('state: ', state)
    console.log('todos: ', todos)
    console.log('todoIds: ', todoIds)

    const renderedListItem = todoIds.map(todoId => {
        return <TodoListItem key={todoId} id={todoId}/>
    })

    return (
        <>
            <ul className="todo-list">{renderedListItem}</ul>
        </>
    )
}

export default TodoList
