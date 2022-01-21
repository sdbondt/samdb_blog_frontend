import { useEffect, useState } from "react"
import ProfilePosts from "../components/blog/ProfilePosts"
import ProfileComments from "../components/comments/ProfileComments"

export default function Profile() {
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userdata'))
        if (storedData && storedData.token) {
          const {token, user} = storedData
        if (storedData.token) {
          setToken(token)
          setUser(user)
        }
        }
    }, [])
    
    useEffect(() => {
        if (token) {
            const getProfileData = async () => {
                const profileData = await fetch("http://localhost:5000/api/auth/profile", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const profileDataJSON = await profileData.json()
                return profileDataJSON
            }
            getProfileData().then(data => {
                setComments(data.comments)
                setPosts(data.posts)
            })
        }        
    }, [user, token])
    
    return (
        <div>
            <p>{user.name}</p>
            {comments && <ProfileComments comments={comments} />}
            {posts && <ProfilePosts posts={posts} /> }
        </div>
        
    )
}