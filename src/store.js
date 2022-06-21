import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import todosReducer from './features/todos/todosSlice'

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
)

const store = createStore(todosReducer, composedEnhancer)
export default store
