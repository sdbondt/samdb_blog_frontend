import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const post = () => {
    const [titleVal, setTitleVal] = useState('')
    const [contentVal, setContentVal] = useState('')
    const [token, setToken] = useState('')
    const router = useRouter()

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userdata'))
        if (storedData) {
          const {token } = storedData
        if (storedData.token) {
          setToken(token)
        }
        }
      }, [])

    const changeTitleHandler = (e) => {
        setTitleVal(e.target.value)
    }

    const changeContentHandler = (e) => {
        setContentVal(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            body: JSON.stringify({ content: contentVal, title: titleVal }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        router.push('/')
    }

    return (
        <React.Fragment>
            <h2>Add your blog post</h2>
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Choose a title</label><br />
            <input type="text" value={titleVal} id="title" onChange={changeTitleHandler} /><br />
            <label htmlFor="content">Add your blog post</label><br />
                <textarea name="content" onChange={changeContentHandler} value={contentVal} id="content" cols="30" rows="10"></textarea><br />
                <button type='submit'>Add your post</button>
        </form>
    
        </React.Fragment>)        
}

export default post
