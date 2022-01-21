import React from 'react'
import ProfilePostItem from './ProfilePostItem'

const ProfilePosts = ({ posts, token }) => {
    return (
        <div>
            <h3>My posts</h3>
            {posts.map((post, i) => {
                return <ProfilePostItem key={i} token={token} post={post} />
            })}
        </div>
    )
}

export default ProfilePosts
