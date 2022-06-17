import {useSelector, useDispatch} from 'react-redux'
import { selectPostIds } from './postsSlice'
import { saveNewPost } from './postsSlice'

export const PostList = () => {
    const dispatch = useDispatch()
    const postIds = useSelector(selectPostIds)
    console.log(postIds);
    let content

    const handleSave = () => {
        dispatch(saveNewPost)
    }
    return (
        <section>
            <h2>Posts</h2>
            <button onClick={handleSave}>
                Save
            </button>
            {content}
        </section>
    )
}