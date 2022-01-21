import React, { useEffect, useState } from 'react'

const CommentItem = ({ comment, postId , setComments }) => {
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [contentVal, setContentVal] = useState(comment.content)
    
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
    
    const deleteHandler = async () => {
        const deleteData = await fetch(`http://localhost:5000/api/posts/${postId}/comments/${comment._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        await deleteData.json()
        setComments((prevState) => {
            const newState = prevState.filter((item) => item._id !== comment._id)
            return newState
        })
    }

    const editHandler = () => {
        setEditMode((prevState) => !prevState)
    }

    const changeCommentVal = (e) => {
        setContentVal(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const editData = await fetch(`http://localhost:5000/api/posts/${postId}/comments/${comment._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ content: contentVal }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const editDataJSON = await editData.json()
        const {comment: updatedComment } = editDataJSON
        setComments((prevState) => {
            const newState = prevState.map(item => {
                if (item._id === updatedComment._id) {
                    return updatedComment
                } else {
                    return item
                }
            })
            return newState
        })
        setEditMode(false)
    }

    if (editMode) {
        return <form onSubmit={submitHandler}>
            <label htmlFor="content">Change your comment</label><br />
            <textarea name="content" id="content" value={contentVal} onChange={changeCommentVal} cols="30" rows="10"></textarea><br />
            <button type='submit'>Edit your post</button>
        </form>
    }
    return (
        <div>
            <p>{comment.content}</p>
            {comment.creator === user.id && <div>
                <button onClick={deleteHandler}>Delete your comment</button><br />
                <button onClick={editHandler}>Edit your comment</button>
            </div>}
        </div>
    )
}

export default CommentItem
