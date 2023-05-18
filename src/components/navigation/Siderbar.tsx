import { BookmarkIcon, Explore, FeedIcon, Message, Premium } from "@/project-icons/Iconify";
import { FollowersIcon } from "@/project-icons/ReactIcons";
import Link from "next/link";
import React from "react";

const Siderbar = () => {
  return (
    <aside className="hidden sticky top-0 w-full h-screen flex-col bg-foreground p-4 border-t border-background md:flex md:w-1/3 lg:w-1/5">
      <div className="flex flex-col space-y-3 ">
        <Link href="" className="flex gap-3 items-center bg-cardColor p-3 rounded-md cursor-pointer">
         <FeedIcon /> Feed 
        </Link>
        <Link href="" className="flex gap-2 items-center bg-cardColor/20 p-3 rounded-md cursor-pointer"><Explore /> Discover</Link>
        <Link href="" className="flex gap-2 items-center bg-cardColor/20 p-3 rounded-md cursor-pointer"> <Message /> Messages</Link>
        <Link href="" className="flex gap-2 items-center bg-cardColor/20 p-3 rounded-md cursor-pointer"> <BookmarkIcon/> Bookmark</Link>
        <Link href="" className="flex gap-2 items-center bg-cardColor/20 p-3 rounded-md cursor-pointer"><Premium /> Subscription</Link>
      </div>
    </aside>
  );
};

export default Siderbar;
