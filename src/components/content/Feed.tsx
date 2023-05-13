import React from "react";
import PostContent from "../post/PostContent";
import PostForm from "../post/PostForm";
import { FeedIcon } from "@/project-icons/Iconify";

const Feed = () => {
  return (
    <div className="w-full flex flex-col bg-background">
      <header className="sticky top-0 w-full flex items-center gap-2 p-4 bg-gray-700 z-10">
        <FeedIcon />
        Feed
        </header>
      <div className="w-full lg:w-1/2 mx-auto py-12 space-y-6 px-4">
        <PostForm />
        {/* <div className="w-full h-screen border"> */}
        <PostContent />
        <PostContent />
        <PostContent />
        <PostContent />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Feed;
