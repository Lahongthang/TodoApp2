import {createSelector} from 'reselect'
import { useSelector } from 'react-redux'

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
            // const newEntities = {}
            // action.payload.forEach(todo => {
            //     newEntities[todo.id] = todo
            // })
            // return {
            //     ...state,
            //     status: 'idle',
            //     entities: newEntities
            // }
            return {
                ...state,
                status: 'idle',
                entities: action.payload
            }
        }
        case 'posts/postAdded': {
            const post = action.payload
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [post.id]: post
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

export const postAdded = (post) => ({type: 'posts/postAdded', payload: post})

//thunk function
export const fetchPosts = () => async dispatch => {
    dispatch(postsLoading())
    await fetch('https://postsapp-7d64f-default-rtdb.firebaseio.com/posts.json')
        .then(res => res.json())
        .then(data => {
            console.log('data: ', data);
            dispatch(postsLoaded(data))
        })
}


export const saveNewPost = (id, title, content) => async (dispatch, getSate) => {
    const newPost = {id: id, title: title, content: content}
    dispatch(postAdded(newPost))
    const posts = getSate().posts.entities
    console.log(posts);
    await fetch('https://postsapp-7d64f-default-rtdb.firebaseio.com/posts.json', {
        method: 'PUT',
        body: JSON.stringify(posts)
    })
        
}

//selectors
export const selectPostEntities = state => state.posts.entities

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