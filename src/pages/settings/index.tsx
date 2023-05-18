import React, { useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/hooks/UserContext";
import { EditIcon } from "@/project-icons/Iconify";
import { CheckMark, DangerIcon } from "@/project-icons/ReactIcons";

const Settings = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div>
        <p>General settings</p>
        <p>Change password</p>
        <p>
          <DangerIcon /> Close account
        </p>
      </div>
      <div className="w-full h-screen space-y-9 bg-background md:w-2/3 md:mx-auto">
        <div className="">
          <div className="flex justify-between items-center p-4">
            <h1>Edit profile</h1>{" "}
            <span
              className={`p-2 ${
                user ? "bg-green-600" : "bg-red-600"
              } rounded-full text-sm italic`}
            >
              {user ? (
                <span className="flex gap-2 items-center">
                  <CheckMark />
                  Account verified
                </span>
              ) : (
                "Account not verified"
              )}
            </span>
          </div>
        </div>
        <div className="flex justify-between ">
          <div className="basis-1/3 relative">
            <span className="absolute text-lg  top-2 left-24 p-2 bg-neutral-700/30 backdrop-blur-md rounded-full z-10">
              <EditIcon />
            </span>
            <div className=" w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="/assets/img2.jpg"
                width={200}
                height={200}
                alt={user?.name || ""}
              />
            </div>
            <p>Change profile</p>
          </div>
          <div className="basis-2/3  space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="name">Fullname</label>
              <input
                type="text"
                name="name"
                value={user?.name}
                className="border"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={user?.email}
                className="border"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="username">
                Username
                <span className="text-gray-500">
                  (only letters, numbers, and underscores)
                </span>
              </label>
              <input
                type="text"
                name="userName"
                value={user?.username || ""}
                className="border"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <div className="w-full space-y-3">
            <h1 className="text-xl font-semibold mb-4">About</h1>
            <div className="flex flex-col space-y-1">
              <label htmlFor="username">Location</label>
              <input
                type="text"
                name="userName"
                value={user?.username || ""}
                className="border"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                id=""
                className="w-full bg-transparent border rounded-md resize-none outline-none h-52"
              ></textarea>
            </div>
          </div>
          <div className="w-full m-10 space-y-3">
            <h1 className="text-xl font-semibold">
              Interest &nbsp; <span className=" text-slate-600"> (maximum 5)</span>
            </h1>

            <div className="border flex flex-wrap gap-x-3 h-40 p-3">
              <span className="h-max px-4 p-2 bg-foreground rounded-md ">Python</span>
              <span className="h-max px-4 p-2 bg-foreground rounded-md">C#</span>
              <span className="h-max px-4 p-2 bg-foreground rounded-md">C++</span>
              <span className="h-max px-4 p-2 bg-foreground rounded-md">DevOps</span>
              <span className="h-max px-4 p-2 bg-foreground rounded-md">Rust</span>
              <label htmlFor="interest">
                <input
                  type="text"
                  name="interest"
                  className=" p-2"
                  placeholder="add a tag"
                />
              </label>
            </div>
          </div>
        </div>
        <button className="w-full p-4 bg-primary rounded-md">
          Update Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
