import {
  FollowersIcon,
  FollowIcon,
  MoreOptionIcon,
} from "@/project-icons/ReactIcons";
import Image from "next/image";
import React from "react";
import PostedAgo from "../post/PostedAgo";

type Props = {
  author: {
    name: string;
  };
  createdAt: Date | undefined;
  currentUser: {
    username: string;
  };
};
const Avartar = ({ author, currentUser, createdAt }: Props) => {
  return (
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
            <h1 className="text-lg font-semibold">{author.name}</h1>
            <span
              title="follow"
              className="text-2xl p-1 text-cardColor cursor-pointer hover:bg-cardColor/30 transition-all ease-linear rounded-md"
            >
              <FollowIcon />
            </span>
          </span>
          <p className="text-sm text-gray-300 -mt-2">{currentUser.username}</p>
          <div>
            <p className="text-[12px] text-gray-500">
              <PostedAgo createdAt={createdAt} />
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
  );
};

export default Avartar;
