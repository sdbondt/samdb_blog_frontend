import React, { useRef, useState,  } from 'react'

const CommentForm = ({ id, token, setError, setComments }) => {
    const [content, setContent] = useState('') 
    
    const submitHandler = async (e) => {
        e.preventDefault()
        const postData = await fetch(`http://localhost:5000/api/posts/${id}/comments`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const postDataJSON = await postData.json()
        if (postDataJSON.msg) {
            setError(postDataJSON.msg)
        }
        if (postDataJSON.comment) {
            setContent('')
            setComments((prevState) => [...prevState, postDataJSON.comment])
        }
    }

    const changeHandler = (e) => {
        setContent(e.target.value)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="comment">Share your thoughts</label><br />
                <textarea name="comment" id="comment" cols="30" rows="10" onChange={changeHandler} value={content}></textarea><br />
                <button>Add comment</button>
            </form>
        </div>
    )
}

export default CommentForm
