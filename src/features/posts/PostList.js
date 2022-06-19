import { useState, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { selectPostIds, selectPosts, saveNewPost, postAdded, selectPostById, selectPostEntities } from './postsSlice'

export const nextId = posts => {
    const maxId = posts.reduce((maxId, post) => Math.max(maxId, post.id), -1)
    return maxId + 1
}

export const PostList = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const titleRef = useRef()

    const allPosts = useSelector(selectPosts)

    const handleTitleChange = e => {
        setTitle(e.target.value)
    }

    const handleContentChange = e => {
        setContent(e.target.value)
    }

    const handleSave = e => {
        if (e.which === 13 && content && title) {
            const id = nextId(allPosts)
            dispatch(saveNewPost(id, title, content))
            setTitle('')
            setContent('')
            titleRef.current.focus()
        }
    }

    return (
        <section>
            <h2>Posts</h2>
            <input
                ref={titleRef}
                type='text'
                placeholder="Add todo's title"
                value={title}
                onChange={handleTitleChange}
                onKeyDown={handleSave}
                autoFocus={true}
            />
            <br/>
            <input
                type='text'
                placeholder="Add todo's content"
                value={content}
                onChange={handleContentChange}
                onKeyDown={handleSave}
            />
        </section>
    )
}