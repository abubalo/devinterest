import {formatDistanceToNow} from "date-fns"

const PostedAgo = () => {
    const post={
        createdAt: new Date(Date.UTC(2023, 4, 5, 2, 30, 0)),
    }

  return formatDistanceToNow(post.createdAt, { addSuffix: true });
}

export default PostedAgo