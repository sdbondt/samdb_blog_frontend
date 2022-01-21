import React from 'react'
import Link from 'next/link'

const ProfileCommentItem = ({ comment }) => {
    const {content, post } = comment
    return (
        <div>
            <p>{content}</p>
            <Link href={`/blog/${post}`}>
                <a>See post</a>
            </Link>
        </div>
    )
}

export default ProfileCommentItem
