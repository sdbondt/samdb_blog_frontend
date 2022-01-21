import React from 'react'
import BlogItem from './BlogItem'

const BlogList = ({ posts }) => {
    return (
        <div>
            {posts.map((post, i) => {
                return <BlogItem key={i} post={post} />
            })}
        </div>
    )
}

export default BlogList
