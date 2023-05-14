import { Chat } from "./chatTypes";
import { Post } from "./postTypes";

export interface User {
    id: string;
    name: string;
    email: string;
    bio?: string;
    gender?: string;
    password: string;
    avatarUrl?: string;
    location?: string;
    createdAt: Date;
    updatedAt: Date;
    follower: User[];
    following: User[];
    posts?: Post[];
    chats?: Chat[];
  }
  