import { Profile } from "@prisma/client";
import axios from "axios";

export type UserData = Profile;


const userApi = axios.create({
  baseURL: "http://localhost:3000/api/routes/user",
  withCredentials: true,
});

export const getUser = async (): Promise<Profile | null> => {
  try {
    const response = await userApi.get("");
    return response.data; 
  } catch (error: any) {
    console.log(error.message);
    return null
  }
};