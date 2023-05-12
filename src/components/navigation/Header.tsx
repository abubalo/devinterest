import { HamburgerMenu, Message, Notification } from "@/project-icons/Iconify";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "../widgets/Dropdown";
import MenuOption from "../widgets/MenuOption";
import Notifications from "../widgets/Notifactions";

const Header = () => {
  const [onClose, setOnClose] = useState<boolean>(false);
  const [onNotification, setOnNotification] = useState<boolean>(false);

  return (
    <>
      <header className=" w-full flex justify-between items-center  bg-foreground p-4">
        <nav className="w-full flex justify-between">
          <div className="text-xl font-bold">Dev.int</div>

          <div className="hidden basis-1/3 bg-background rounded-md md:block">
            <label htmlFor="serch">
              <input
                type="search"
                name=""
                id=""
                placeholder="serach..."
                className="w-full bg-transparent p-2 border border-transparent focus:outline-none focus:border-primary"
              />
            </label>
          </div>

          <div 
          onClick={()=> setOnClose(!onClose)}
          className="flex gap-3 items-center justify-between">
            <div 
            onClick={()=> setOnNotification(!onNotification)}
            className="text-2xl cursor-pointer">
              <Notification />
              {/* <Notifications onClose={onClose}/> */}
            </div>
            <div 
            onClick={()=> setOnClose(!onClose)}
            className="w-12 h-12 overflow-hidden rounded-full bg-online aspect-square cursor-pointer">
              <Image
                src="/assets/img1.jpg"
                width={50}
                height={50}
                alt="user image"
              />
            </div>
            {/* User Option */}
            <MenuOption onClose={onClose}/>
            <div className="block text-2xl cursor-pointer md:hidden">
              <HamburgerMenu />
            </div>
          </div>
        </nav>
      </header>

    </>
  );
};

export default Header;
