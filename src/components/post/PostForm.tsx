import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MediaIcon, EmojiIcon } from "@/project-icons/ReactIcons";
import { GifIcon } from "@/project-icons/Iconify";
import { useQueryClient, useMutation } from "react-query";
import { addPost, CreatePostData } from "@/queries/postQeuries";

const PostForm = () => {
  const [value, setValue] = useState("");
  const [expand, setExpand] = useState(false);

  function handleTextareaSize(e: ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    const cols = Math.floor(textarea.scrollWidth / 5); // Set 10 as an average character width
    textarea.cols = cols > 0 ? cols : 1;
  }

  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess } = useMutation(
    "addPost",
    (data: CreatePostData) => addPost(data),
    {
      onSuccess: (data) => {
        console.log("Successfuly add new post", data);
        queryClient.invalidateQueries("addPost");
      },

      onError: (error: any) => {
        console.log("An error occured", error.message);
      },
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO get authorId
    const authorId = "jj";
    const content = value;
    const tags = ["ddd"];

    // mutate({authorId, content, tags})

    setValue("");
    setExpand(false);
  };

  return (
    <AnimatePresence>
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto flex gap-3 items-start justify-between"
      >
        <div className="w-12 h-12 overflow-hidden rounded-full bg-online aspect-square">
          <Image
            src="/assets/img1.jpg"
            width={50}
            height={50}
            alt="user image"
          />
        </div>
        <motion.div
          layout="size"
          transition={{ duration: 0.25}}
          onClick={() => setExpand(true)}
          className="w-full h-auto bg-cardColor rounded-md focus:border-slate-400/10"
        >
          <label htmlFor="postForm"></label>
          <motion.textarea
            name="postForm"
            onChange={handleTextareaSize}
            placeholder=" What is on your mind..."
            value={value}
            className=" w-full h-auto text-sm text-slate-100 bg-transparent p-2 resize-none focus:outline-none "
            cols={10}
          ></motion.textarea>
          {expand && (
            <AnimatePresence>
              <motion.div
                layout="position"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between text-xl p-2 border-t border-slate-700"
              >
                <div className="flex gap-3  items-center justify-center ">
                  <MediaIcon />
                  <GifIcon />
                </div>
                <div className="flex gap-3 items-center justify-center">
                  <div className="p-2 ">#</div>
                  <EmojiIcon />
                </div>
              </motion.div>
              <motion.div
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="w-full flex items-end justify-end bg-primary/30 p-2"
              >
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-primary rounded-md"
                >
                  Post
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </form>
    </AnimatePresence>
  );
};

export default PostForm;
