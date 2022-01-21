import React from 'react'
import CommentItem from './CommentItem'

const CommentList = ({ comments, postId, setComments }) => {
    return (
        <div>
            {comments.map((comment, i) => {
                return <CommentItem key={i} setComments={setComments} postId={postId} comment={comment} />
            })}
        </div>
    )
}

export default CommentList
