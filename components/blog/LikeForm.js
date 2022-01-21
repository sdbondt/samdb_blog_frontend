import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const LikeForm = ({ postId, token, user }) => {
    const [likers, setLikers] = useState([])
    const router = useRouter()

    useEffect(() => {
        const getLikers = async () => {
            const likersData = await fetch(`http://localhost:5000/api/posts/${postId}/likes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const likersDataJSON = await likersData.json()
            return likersDataJSON
        }
        getLikers().then(data => setLikers(data.likers))
    }, [])

    const addLike = async () => {
        await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }    
        })
        router.reload(window.location.pathname)
    }

    const removeLike = async () => {
        await fetch(`http://localhost:5000/api/posts/${postId}/unlike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }    
        })
        router.reload(window.location.pathname)
    }
    if (!likers) {
        return  <p>One moment...</p>
    }

    if (likers) {
        console.log(likers)
        return (
            <div>
                {!likers.some((l) => l._id === user.id) && <button onClick={addLike}>Like</button>}
                {likers.some((l) => l._id === user.id) && <button onClick={removeLike}>Unlike</button>}
            </div>
        )
    }
    
}

export default LikeForm
