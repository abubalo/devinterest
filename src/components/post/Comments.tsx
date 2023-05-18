import React from "react";
import Image from "next/image";
import {Comment} from "../../types/CommentTypes"
import PostedAgo from "./PostedAgo";

type CommentProps = {
  comments: Comment[] | undefined
};

const Comments = ({ comments }: CommentProps) => {
  

  if(!comments){
    return <p className="p-4 bg-neutral-700/50">No comment...</p>
  }
  console.log("Comment:", comments)

  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <div  className="ml-4 mt-4">
            <div className="relative flex gap-4 items-start">
              <div className=" w-8 h-8 overflow-hidden rounded-full aspect-square">
                <Image
                  src={comment?.author?.name ||"/assets/img1.jpg"}
                  width={50}
                  height={50}
                  alt={comment?.author?.name || ""}
                />
              </div>
              <div>
                <p className="text-sm">{comment?.author?.name}</p>
                <p className="text-[0.6rem] text-gray-300 -">{comment?.author?.name}</p>
                <div>
                  <p className="text-[12px] text-gray-500">{comment?.createdAt.toLocaleDateString()}</p>
                  <PostedAgo createdAt={comment.createdAt} />
                </div>
              </div>
            </div>

            <div className="text-sm font-light text-slate-50/80 text-justify">
              <p className="leading-normal">
                {comment.content}
              </p>
            </div>
          </div>
          {comment.replies && comment.replies.map((reply: any) =><>{<Comments key={comment.id} comments={reply} />} </>)}
        </div>
      ))}
    </>
  );
};

export default Comments;
