import {createSelector} from 'reselect'

//init state
const initialState = {
    status: 'idle',
    entities: {}
}

//reducers
export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case 'posts/postsLoading': {
            return {
                ...state,
                status: 'loading'
            }
        }
        case 'posts/postsLoaded': {
            const newEntities = {}
            action.payload.forEach(todo => {
                newEntities[todo.id] = todo
            })
            return {
                ...state,
                status: 'idle',
                entities: newEntities
            }
        }
        case 'posts/postAdded': {
            
            return {
                ...state,
                entities: {
                    ...state.entities
                    ///////////////////
                }
            }
        }
        default:
            return state
    }
}

const data = {id: 0, title: "First post", content: "Content of first post"}
    


//action creators
export const postsLoading = () => ({type: 'posts/postsLoading'})

export const postsLoaded = (posts) => ({type: 'posts/postsLoaded', payload: posts})

//thunk function
export const fetchPosts = () => async dispatch => {
    dispatch(postsLoading())
    await fetch('https://postsapp-7d64f-default-rtdb.firebaseio.com/posts.json')
        .then(res => res.json())
        .then(data => dispatch(postsLoaded(data)))
}

export const saveNewPost = () => async () => {
    await fetch('https://postsapp-7d64f-default-rtdb.firebaseio.com/posts.json', {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

//selectors
const selectPostEntities = state => state.posts.entities

export const selectPosts = createSelector(
    selectPostEntities,
    entities => Object.values(entities)
)

export const selectPostById = (state, postId) => {
    return selectPostEntities(state)[postId]
}

export const selectPostIds = createSelector(
    selectPosts,
    posts => posts.map(post => post.id)
)