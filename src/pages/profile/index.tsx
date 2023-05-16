import React, { useContext } from "react";
import Image from "next/image";
import { EditIcon } from "@/project-icons/Iconify";
import { UserContext } from "@/hooks/UserContext";

const Index = () => {

  const {user} = useContext(UserContext)
  return (
    <div className="w-[90%] mx-auto h-screen">
      <div className="relative bg-foreground h-1/3">
        {user?.name}
        <span className="absolute bottom-10 left-[6%] z-10 bg-cardColor/30 backdrop-blur-lg p-2 rounded-full cursor-pointer">
          <EditIcon />
        </span>
        <div className="absolute bg-cardColor w-24 h-24 rounded-full -bottom-8 overflow-hidden">
          <Image src="/assets/img1.jpg" alt="" width={100} height={100} />
        </div>
      </div>
    </div>
  );
};

export default Index;
