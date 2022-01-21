import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SingleBlog = ({ post }) => {
    const { creator } = post
    const { title, content, _id } = post
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [updateTitle, setUpdateTitle] = useState()
    const [updateContent, setUpdateContent] = useState()
    const router = useRouter()

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userdata'))
        if (storedData) {
          const {token, user} = storedData
        if (storedData.token) {
          setToken(token)
          setUser(user)
        }
        }
    }, [])

    const removePost = async () => {
        await fetch(`http://localhost:5000/api/posts/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        router.push('/')
    }

    const changeTitleHandler = (e) => {
        setUpdateTitle(e.target.value)
    }

    const changeContentHandler = (e) => {
        setUpdateContent(e.target.value)
    }

    const switchEditMode = () => {
        setEditMode((prevState) => !prevState)
        setUpdateTitle(title)
        setUpdateContent(content)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:5000/api/posts/${_id}`, {
            method: 'PATCH',
            body: JSON.stringify({ content: updateContent, title: updateTitle }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        setEditMode(false)
        router.replace('/')
    }

    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p><br />
            {creator === user.id && <button onClick={removePost}>Remove post</button>}
            {creator === user.id && !editMode && <button onClick={switchEditMode}>Update your post</button>}
            {editMode && <form onSubmit={submitHandler}>
                <label htmlFor="title">Title</label><br />
                <input type="text" id="title" value={updateTitle} onChange={changeTitleHandler} /><br />
                <label htmlFor="content">Content</label><br />
                <textarea name="content" id="content" cols="30" rows="10" value={updateContent} onChange={changeContentHandler} ></textarea>
                <button type="submit">Update post</button>
            </form>}
        </div>
    )
}

export default SingleBlog
