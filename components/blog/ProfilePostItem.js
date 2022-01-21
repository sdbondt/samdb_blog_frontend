import React from 'react'
import Link from 'next/link'

const ProfilePostItem = ({ post }) => {
    const { _id,  title } = post
    return (
        <div>
            <p>{title}</p>
            <Link href={`/blog/${_id}`}>
                <a>See post</a>
            </Link>
        </div>
    )
}

export default ProfilePostItem
