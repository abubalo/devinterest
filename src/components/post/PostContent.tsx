import { Comment, Love } from "@/project-icons/Iconify";
import { useContext } from "react";
import CommentContainerComponent from "./CommentContainer";
import { getAllPosts } from "../../queries/postQueries";
import { useQuery } from "react-query";
import { UserContext } from "@/hooks/UserContext";
import Avartar from "../user/Avartar";

const PostContent = () => {
  const { user } = useContext(UserContext);

  const { data: posts, isLoading, error } = useQuery(["posts"], getAllPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <>error {error}</>;
  }

  console.log(posts[6])

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          <div className="w-full flex flex-col bg-foreground h-auto p-4 space-y-5 border border-slate-400/10 rounded-md">
            {/* User profile */}
            <Avartar author={post.author} createdAt={post.createdAt} currentUser={user}/>

            {/* post content */}
            <div className="text-sm font-light text-justify">
              <p>{post.content}</p>
            </div>
            {/* comment and likes tally */}
            <div className="flex gap-6">
              <div title="likes" className="flex gap-2 items-center">
                <div className="cursor-pointer">
                  {/* <LoveIcon /> */}
                  <Love />
                </div>
                <p>{post?.likes?.length}</p>
              </div>
              <div
                title="comments"
                className="flex gap-2 items-center cursor-pointer"
              >
                <Comment />
                <p>{post?.comments?.length}</p>
              </div>
            </div>


            <CommentContainerComponent comments={post.comments || []} postId={post.id}/>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostContent;
