import React from "react";
import Image from "next/image";


const Comments = () => {
  const replies =[
    {name: "Mercy Alade"},
    {name: "Abu Balo"}
  ]
  return (
    <>
    <div className="ml-4 mt-4">
      <div className="relative flex gap-4 items-start">
        <div className=" w-8 h-8 overflow-hidden rounded-full aspect-square">
          {/* online status */}
          {/* <div className="absolute w-3 h-3 bg-online rounded-full bottom-3 left-[40px]"></div> */}
          <Image
            src="/assets/img1.jpg"
            width={50}
            height={50}
            alt="user image"
          />
        </div>
        <div>
          <p className="text-sm">Janet Macron</p>
          <p className="text-[0.6rem] text-gray-300 -">Dev Advocate</p>
          <div>
            <p className="text-[12px] text-gray-500">2 minutes ago</p>
          </div>
        </div>
      </div>

      <div className="text-sm font-light text-slate-50/80 text-justify">
        <p className="leading-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nam fuga
          impedit officiis doloribus saepe.
        </p>
      </div>
    </div>
    {/* {replies && replies.map(reply =><>{<Comments />} </>)} */}
    </>
  );
};

export default Comments;
