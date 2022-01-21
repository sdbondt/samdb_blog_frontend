import React from 'react'
import Link from 'next/link'

const BlogItem = ({ post }) => {
    const { _id, title } = post
    return (
        <div>
            <Link href={`blog/${_id}`}>
                <a>{title}</a>
            </Link>
        </div>
    )
}

export default BlogItem
