import React from 'react'
import {motion} from "framer-motion"
type Props ={
    label: string,
    content: string,
    isActive: boolean,
    onClick: ()=> void;
}
const Tab = ({label, content, isActive, onClick}: Props) => {
  return (
    <motion.div 
    initial={{}}
    animate={{}}
    exit={{}}
    onClick={onClick}
    className={`${isActive ? "flex" : "hidden"}`}>
        {content}
    </motion.div>
  )
}

export default Tab