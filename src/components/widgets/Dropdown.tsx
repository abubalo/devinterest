import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  position: string;
  // onClick: React.Dispatch<React.SetStateAction<boolean>>
};
const Dropdown = ({ children, position = "top-20" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(()=>{
  //   const element = ref.current
  //   document.addEventListener('click',()=>{
  //     // if(!element?.matches){
  //     //  return false
  //     // }
  //   })
  // },[])

  
  return (
    <motion.div
      ref={ref}
      layout="position"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.25, ease: "linear" }}
      className={`absolute w-max h-auto flex flex-col bg-cardColor text-sm font-normal p-2 space-y-2 ${position} z-50`}
    >
      {children}
    </motion.div>
  );
};

export default Dropdown;
