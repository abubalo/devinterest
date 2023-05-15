import { User } from "@prisma/client";
import axios from "axios";

export type UserData = Pick<User, "name" | "email" | "password">;

export type LoginData = Pick<User, "email" | "password">;

const userApi = axios.create({
  baseURL: "http://localhost:3000/api/routes/user",
  withCredentials: true,
});

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await userApi.get("");
    return response.data; //Set withCredentials to true for all requests made with userApi
  } catch (error: any) {
    console.log(error.message);
    return null
  }
};

export const addUser = async (data: UserData): Promise<User | null> => {
  try {
    const response = await userApi.post("/create", data);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return null
  }
};

export const loginUser = async (data: LoginData): Promise<User | null> => {
  try {
    const response = await userApi.post("/login", data);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return null
  }
};

export const updateUser = async (id: string, data: UserData): Promise<User | null> => {
  try {
    const response = await userApi.patch(`/update/?id=${id}`, data);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return null
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  await userApi.delete(`/delete/?id=${id}`);
};

export default userApi;
