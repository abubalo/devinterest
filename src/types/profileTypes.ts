import { User } from "./userTypes";
export interface Profile {
    id: string;
    bio?: string;
    gender?: string;
    avatarUrl?: string;
    location?: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
  }