import React from "react";
import Image from "next/image";
import { Comment } from "../../types/CommentTypes";
import PostedAgo from "./PostedAgo";

type CommentProps = {
  comments: Comment[] | undefined;
};

const Comments = ({ comments }: CommentProps) => {

  if(!comments || comments.length === 0){
    return <div className="text-sm">No comment</div>
  }

  return (
    <>
   
      {comments?.map((comment) => (
        <div key={comment.id}>
          <div className="ml-4 mt-4">
            <div className="relative flex gap-4 items-start">
              <div className=" w-8 h-8 overflow-hidden rounded-full aspect-square">
                <Image
                  src={""}
                  width={50}
                  height={50}
                  alt={comment?.author?.name || ""}
                />
              </div>
              <div>
                {/* <p className="text-sm">{comment?.author}</p>
                <p className="text-[0.6rem] text-gray-300 -">
                  {comment?.author}
                </p> */}
                <div>
                  <p className="text-[12px] text-gray-500">
                    {comment?.createdAt.toLocaleString()}
                  </p>
                  <PostedAgo createdAt={comment.createdAt} />
                </div>
              </div>
            </div>

            <div className="text-sm font-light text-slate-50/80 text-justify">
              <p className="leading-normal">{comment.content}</p>
            </div>
          </div>
          {comment.replies &&
            comment.replies.map((reply: any) => (
              <>{<Comments key={comment.id} comments={reply.replies} />} </>
            ))}
        </div>
      ))}
    </>
  );
};

export default Comments;
