import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MediaIcon, EmojiIcon } from "@/project-icons/ReactIcons";
import { GifIcon } from "@/project-icons/Iconify";

const PostForm = () => {
  const [value, setValue] = useState("");
  const [expand, setExpand] = useState(false);

  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    const cols = Math.floor(textarea.scrollWidth / 5); // Set 10 as an average character width
    textarea.cols = cols > 0 ? cols : 1;
  }

  return (
    <div className="w-full h-auto flex gap-3 items-start justify-between">
      <div className="w-12 h-12 overflow-hidden rounded-full bg-online aspect-square">
        <Image src="/assets/img1.jpg" width={50} height={50} alt="user image" />
      </div>
      <div
      onClick={()=> setExpand(true)}
      className="w-full h-max bg-cardColor rounded-md focus:border-slate-400/10">
        <label htmlFor="postForm"></label>
        <motion.textarea
          layout="position"
          name="postForm"
          placeholder=" What is on your mind..."
          className=" w-full h-auto text-sm text-slate-100 bg-transparent p-2 resize-none focus:outline-none "
          value={value}
          onChange={handleTextareaChange}
          cols={10}
        ></motion.textarea>
        {expand && (
          <AnimatePresence>
            <motion.div 
            layout="position"
            className="flex items-center justify-between text-xl p-2 border-t border-slate-700">
              <div className="flex gap-3  items-center justify-center ">
                <MediaIcon />
                <GifIcon />
              </div>
              <div className="flex gap-3 items-center justify-center">
                <div className="p-2 ">#</div>
                <EmojiIcon />
              </div>
            </motion.div>
            <div className="w-full flex items-end justify-end bg-primary/30 p-2">
              <button className="px-4 py-2 text-sm bg-primary rounded-md">Post</button>
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default PostForm;
