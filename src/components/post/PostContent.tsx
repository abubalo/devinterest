import { Comment, Love } from "@/project-icons/Iconify";
import { FollowIcon, MoreOptionIcon } from "@/project-icons/ReactIcons";
import Image from "next/image";
import { useContext } from "react";
import Comments from "./Comments";
import { getAllPosts } from "../../queries/postQueries";
import { useQuery } from "react-query";
import { UserContext } from "@/hooks/UserContext";
import PostedAgo from "./PostedAgo";

const PostContent = () => {
  const { user } = useContext(UserContext);

  const { data: posts, isLoading, error } = useQuery(["posts"], getAllPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <>error {error}</>;
  }

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          <div className="w-full flex flex-col bg-foreground h-auto p-4 space-y-5 border border-slate-400/10 rounded-md">
            {/* User profile */}
            <div className="relative flex justify-between gap-4 items-start">
              <div className="flex gap-2">
                <div className=" w-12 h-12 overflow-hidden rounded-full bg-online aspect-square">
                  <Image
                    src={`/assets/img1.jpg`}
                    width={50}
                    height={50}
                    alt="user image"
                  />
                </div>
                <div>
                  <span className="flex gap-3 items-center">
                    <h1 className="text-lg font-semibold">
                      {post.author?.name}
                    </h1>
                    <span
                      title="follow"
                      className="text-2xl p-1 text-cardColor cursor-pointer hover:bg-cardColor/30 transition-all ease-linear rounded-md"
                    >
                      <FollowIcon />
                    </span>
                  </span>
                  <p className="text-sm text-gray-300 -mt-2">
                    {user?.username}
                  </p>
                  <div>
                    <p className="text-[12px] text-gray-500">
                      {/* {post?.createdAt} */}
                      <PostedAgo createdAt={post.createdAt} />
                    </p>
                  </div>
                </div>
              </div>
              <div
                title="options"
                className="text-2xl p-2 text-cardColor cursor-pointer hover:bg-cardColor/30 transition-all ease-linear rounded-md"
              >
                <MoreOptionIcon />
              </div>
            </div>

            {/* post content */}
            <div className="text-sm font-light text-justify">
              <p>{post.content}</p>
            </div>
            {/* comment and likes tally */}
            <div className="flex gap-6">
              <div title="likes" className="flex gap-2 items-center">
                <div className="">
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

            {/* Conment section */}

            <div>
              <div className="w-full min-h-min h-auto flex gap-3 items-start justify-center">
                <div className="w-12 h-12 overflow-hidden rounded-full bg-online aspect-square">
                  <Image
                    src="/assets/img1.jpg"
                    width={50}
                    height={50}
                    alt={""}
                  />
                </div>
                <div className="w-full h-12 bg-cardColor rounded-md overflow-auto">
                  <label htmlFor="comment"></label>
                  <input
                    name="comment"
                    placeholder="add a comment..."
                    className="basis-1/2 w-full h-full bg-transparent p-2"
                  />
                </div>
              </div>
            </div>
            <Comments comments={post.comments || []} />
          </div>
        </div>
      ))}
    </>
  );
};

export default PostContent;
