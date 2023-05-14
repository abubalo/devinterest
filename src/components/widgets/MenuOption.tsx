import React from "react";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

type Props = {
  onClose: boolean;
};
const MenuOption = ({ onClose }: Props) => {
  return (
    <AnimatePresence>
      {onClose && (
        <Dropdown position={"top-[70px] right-5"}>
          <Link href={"#"} className="p-2 w-full">
            Settings
          </Link>
          <Link href={"#"} className="p-2 w-full">
            Support
          </Link>
          <Link href={"#"} className="p-2 w-full">
            Logout
          </Link>
          <Link href={"#"} className="p-2 w-full">
            Sign in
          </Link>
        </Dropdown>
      )}
    </AnimatePresence>
  );
};

export default MenuOption;
