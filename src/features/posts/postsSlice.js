const initialState = {
    status: 'idle',
    entities: []
}

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case 'posts/postsLoading': {
            return {
                ...state,
                status: 'loading'
            }
        }
        case 'posts/postsLoaded': {
            return {
                ...state,
                status: 'idle',
                entities: [
                    ...state.entities,
                    action.payload
                ]
            }
        }
        default:
            return state
    }
}

export const postsLoading = () => ({type: 'posts/postsLoading'})

export const postsLoaded = (posts) => ({type: 'posts/postsLoaded', payload: posts})

export const fetchPosts = () => async dispatch => {
    dispatch(postsLoading())
    await fetch('https://postsapp-7d64f-default-rtdb.firebaseio.com/posts.json')
        .then(res => res.json())
        .then(data => dispatch(postsLoaded(data)))
}