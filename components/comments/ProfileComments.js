import React from 'react'
import ProfileCommentItem from './ProfileCommentItem'

const ProfileComments = ({ comments, token }) => {
    return (
        <div>
            <h3>My comments:</h3>
            {comments.map((comment, i) => {
                return <ProfileCommentItem key={i} token={token} comment={comment} />
            })}
        </div>
    )
}

export default ProfileComments
