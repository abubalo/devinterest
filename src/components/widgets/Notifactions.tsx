import React from "react";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
type Props={
  onClose: boolean
}

const Notifications = ({onClose}: Props) => {
    // const [onClose, setOnClose] = useState<boolean>(true);
  return (
      <AnimatePresence>
        { onClose &&
          <Dropdown position={"top-[70px] right-5"}>
          <Link href={"#"} className="p-2 w-full">
            John liked your post
          </Link>
          <Link href={"#"} className="p-2 w-full">
            Adam messaged you
          </Link>
          <Link href={"#"} className="p-2 w-full">
            Bisi commented on your post
          </Link>
        </Dropdown>
        }
      </AnimatePresence>
  );
};

export default Notifications;
