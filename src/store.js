import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import postsReducer from './features/posts/postsSlice'

const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunkMiddleware)
)

const store = createStore(postsReducer, composedEnhancer)

export default store