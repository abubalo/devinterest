import { Comment, Love } from "@/project-icons/Iconify";
import { FollowIcon } from "@/project-icons/ReactIcons";
import Image from "next/image";
import React from "react";
import Comments from "./Comments";

const PostContent = () => {
  return (
    <div className="w-full flex flex-col bg-foreground h-auto p-4 space-y-5 border border-slate-400/10 rounded-md">
      {/* User profile */}
      <div className="relative flex justify-between gap-4 items-start">
        <div className="flex gap-2">
          <div className=" w-12 h-12 overflow-hidden rounded-full bg-online aspect-square">
            <Image
              src="/assets/img1.jpg"
              width={50}
              height={50}
              alt="user image"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Janet Macron</p>
            <p className="text-sm text-gray-300 -">Dev Advocate</p>
            <div>
              <p className="text-[12px] text-gray-500">posted 2 minutes ago</p>
            </div>
          </div>
        </div>
        <div className="text-2xl p-2 text-cardColor cursor-pointer hover:bg-cardColor/30 transition-all ease-linear rounded-md"><FollowIcon/> </div>
      </div>

      {/* post content */}
      <div className="text-sm font-light text-justify">
        <p className="leading-loose">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nam fuga
          impedit officiis doloribus saepe, accusamus quis illum, obcaecati
          exercitationem, maxime excepturi voluptatum consequatur cumque quam?
          Sed alias exercitationem sunt. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Incidunt rem eius, accusamus ipsum repellendus,
          dicta voluptates itaque quisquam omnis blanditiis, reprehenderit culpa
          tenetur laboriosam eligendi animi officiis. Quibusdam, animi repellat.
        </p>
      </div>
      {/* comment and likes tally */}
      <div className="flex gap-6">
        <div className="flex gap-2 items-center">
          <span className="cursor-pointer">
            <Love />
          </span>
          <p>1</p>
        </div>
        <div className="flex gap-2 items-center cursor-pointer">
          <Comment />
          <p>0</p>
        </div>
      </div>

      {/* Conment form */}

      <div>
        <div className="w-full min-h-min h-auto flex gap-3 items-start justify-center">
          <div className="w-12 h-12 overflow-hidden rounded-full bg-online aspect-square">
            <Image
              src="/assets/img2.jpg"
              width={50}
              height={50}
              alt="user image"
            />
          </div>
          <div className="w-full h-12 bg-cardColor rounded-md overflow-auto">
            <label htmlFor="postForm"></label>
            <input
              aria-label="postForm"
              contentEditable={false}
              placeholder="add a comment..."
              className="basis-1/2 w-full h-full bg-transparent p-2"
            />
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default PostContent;
