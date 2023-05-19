import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { EditIcon } from "@/project-icons/Iconify";
import { UserContext } from "@/hooks/UserContext";
import PostContent from "@/components/post/PostContent";
import { BackWard } from "@/project-icons/ReactIcons";

const Index = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="w-full mx-auto h-screen">
       {/* <div className="absolute top-6 p-4 mt-6 cursor-pointer"> */}
      <div className=" relative bg-cover backdrop-blur-xl  h-1/3">
        <div className="w-[90%] mx-auto">
          {user && (
            <div className="flex justify-between">
              <Link href={"/"} className="flex gap-2 items-center">
                <BackWard /> Go home
              </Link>
        
              <Link href={"/settings"} className="w-max flex gap-2 items-center mt-6 bg-foreground/30 backdrop-blur-lg border border-neutral-300/20 px-6 py-3 rounded-full cursor-pointer hover:bg-neutral-700/10 transition-all duration-100 ease-linear">
                <EditIcon />
                Edit profile
              </Link>
            </div>
          )}

          <div className="absolute bg-cardColor w-32 h-32 border-4 border-neutral-50/30 backdrop-blur-xl rounded-full -bottom-20 overflow-hidden">
            <Image src="/assets/img1.jpg" alt="" width={200} height={200} />
          </div>
          <div className="absolute text-lg -bottom-16 left-52">
            <p>{user?.name}</p>
            <p className="text-sm">{user?.username}</p>
          </div>
        </div>
      </div>
      
      <div className="w-full h-full md:w-1/2 mx-auto mt-28 ">
        <div className="flex  p-2">
          <span className="pr-12 py-3 border-b border-cardColor cursor-pointer">
            Post
          </span>
          <span className="pr-12 py-3 border-b border-cardColor/50 cursor-pointer">
            Followers
          </span>
          <span className="pr-12 py-3 border-b border-cardColor/50 cursor-pointer">
            Following
          </span>
          <span className="pr-12 py-3 border-b border-cardColor/50 cursor-pointer">
            Media
          </span>
          <span className="pr-12 py-3 border-b border-cardColor/50 cursor-pointer">
            Stats
          </span>
        </div>
        <div className="p-8 md:pl-0">
          <div className="space-y-6">
            <PostContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
