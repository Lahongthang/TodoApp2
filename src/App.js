import React from 'react'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { selectTodos, updateTodos } from './features/todos/todosSlice'
import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'
import Footer from './features/footer/Footer'

let isInitial = 0

function App() {
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)

  useEffect(() => {
    if (isInitial < 2) {
      isInitial ++
      return
    }
    dispatch(updateTodos(todos))
  }, [todos])

  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
