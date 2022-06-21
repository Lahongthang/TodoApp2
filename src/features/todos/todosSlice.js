import { createSelector } from 'reselect'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = {
    status: 'idle',
    entities: {
        data: [],
        links: {},
        meta: {}
    }
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todoAdded': {
            const todo = action.payload
            return {
                ...state,
                entities: {
                ...state.entities,
                [todo.id]: todo
                }
            }
        }
        case 'todos/todoToggled': {
            const todoId = action.payload
            return {
                ...state,
                entities: {
                    ...state.entities,
                    data: state.entities.data.map(todo => {
                        if (todo.id !== todoId) {
                            return todo
                        }
                        return {
                            ...todo,
                            completed: !todo.completed
                        }
                    })
                }
            }
        }
        case 'todos/colorSelected': {
            const { color, todoId } = action.payload
            return {
                ...state,
                entities: {
                    ...state.entities,
                    data: state.entities.data.map(todo => {
                        if (todo.id !== todoId) {
                            return todo
                        }
                        return {
                            ...todo,
                            color: {
                                name: color
                            }
                        }
                    })
                }
            }
        }
        case 'todos/todoDeleted': {
            const newEntities = { ...state.entities }
            delete newEntities[action.payload]
            return {
                ...state,
                entities: newEntities
            }
        }
        case 'todos/allCompleted': {
            const newEntities = { ...state.entities }
            Object.values(newEntities).forEach((todo) => {
                newEntities[todo.id] = {
                ...todo,
                completed: true
                }
            })
            return {
                ...state,
                entities: newEntities
            }
        }
        case 'todos/completedCleared': {
            const newEntities = { ...state.entities }
            Object.values(newEntities).forEach((todo) => {
                if (todo.completed) {
                delete newEntities[todo.id]
                }
            })
            return {
                ...state,
                entities: newEntities
            }
        }
        case 'todos/todosLoading': {
            return {
                ...state,
                status: 'loading'
            }
        }
        case 'todos/endLoading': {
            return {
                ...state,
                status: 'idle'
            }
        }
        case 'todos/todosLoaded': {
            return {
                ...state,
                status: 'idle',
                entities: action.payload
            }
        }
        default:
        return state
    }
}

//action creators
export const todoAdded = (todo) => ({ type: 'todos/todoAdded', payload: todo })

export const todoToggled = (todoId) => ({
    type: 'todos/todoToggled',
    payload: todoId
})

export const todoColorSelected = (todoId, color) => ({
    type: 'todos/colorSelected',
    payload: { todoId, color }
})

export const todoDeleted = (todoId) => ({
    type: 'todos/todoDeleted',
    payload: todoId
})

export const allTodosCompleted = () => ({ type: 'todos/allCompleted' })

export const completedTodosCleared = () => ({ type: 'todos/completedCleared' })

export const todosLoading = () => ({ type: 'todos/todosLoading' })

export const endLoading = () => ({type: 'todos/endLoading'})

export const todosLoaded = (todos) => ({
    type: 'todos/todosLoaded',
    payload: todos
})

// Thunk function

// get all
export const fetchTodos = () => async (dispatch) => {
    dispatch(todosLoading())
    await fetch('http://localhost:8000/api/todos')
        .then(response => response.json())
        .then(result => {
            console.log('result: ', result)
            dispatch(todosLoaded(result))
        })
}

// update todo
export const updateTodo = ({id, completed, color}) => async dispatch => {
    let url
    let action
    if (completed !== undefined) {
        url = `http://localhost:8000/api/todos/${id}?completed=${!completed}`
        action = todoToggled(id)
    } else if (color !== undefined) {
        url = `http://localhost:8000/api/todos/${id}?color=${color}`
        action = todoColorSelected(id, color)
    }

    const response = await fetch(url, {method: 'PUT'})
    if (!response.ok) {
        throw new Error('toggle faild!')
    }
    console.log('success');
    dispatch(action)
}


//selectors
const selectEntities = state => state.entities

export const selectTodos = createSelector(
    selectEntities,
    entities => entities.data
)

export const selectTodoIds = createSelector(
    selectTodos,
    todos => todos.map(todo => todo.id)
)

export const selectTodoById = todoId => createSelector(
    selectTodos,
    todos => todos.find(todo => todo.id === todoId)
)