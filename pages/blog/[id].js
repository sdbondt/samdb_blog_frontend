import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import LikeForm from '../../components/blog/LikeForm'
import SingleBlog from '../../components/blog/SingleBlog'
import CommentForm from '../../components/comments/CommentForm'
import CommentList from '../../components/comments/CommentList'
import ErrorDisplay from '../../components/ErrorDisplay'

export default function SingleBlogItem() {
    const [error, setError] = useState('')
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})
    const [postId, setPostId] = useState('')
    const router = useRouter()

    useEffect(() => {
        const { id } = router.query
        if (id) {
            setPostId(id)
        }
    }, [router])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userdata'))
        if (storedData && storedData.token) {
            const { token, user } = storedData
            setUser(user)
            setToken(token)
        }
      }, [])

    useEffect(() => {
        if (token && postId) {           
            const fetchPost = async () => {
                const data = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const dataJSON = await data.json()
                return dataJSON
            }

            const fetchComments = async () => {
                const data = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const dataJSON = await data.json()
                return dataJSON
            }
            fetchPost().then(data => setPost(data.post))
            fetchComments().then(data => setComments(data.comments))      
        }       
    }, [token, postId])

    if (error) {
        return <ErrorDisplay setError={setError} error={error} />
    }
    
    if (!post || !postId) {
        return <p>Nothing to see here</p>
    }

    return (
        <React.Fragment>
            <SingleBlog post={post} />
            <LikeForm postId={postId} token={token} user={user} />
            <CommentForm setComments={setComments} setError={setError} token={token} id={postId} />
            <CommentList setComments={setComments} postId={postId} comments={comments} />
        </React.Fragment>
    )
}
