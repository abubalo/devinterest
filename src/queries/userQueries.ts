import { User } from "@prisma/client";
import axios from "axios";


export type UserData =  Pick<User, "name" | "email" | "password">

type LoginData = Pick<User, 'name' | 'email'>

const userApi = axios.create({
  baseURL: "http://localhost:3000/api/user",
});


export const getUser = async (): Promise<User> => {
  const response = await userApi.get("/index");
  return response.data;
};

export const addUser = async (data: UserData ): Promise<User> => {
  const response = await userApi.post("/create", data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<User> => {
  const response = await userApi.post("/login", data);
  return response.data;
};

export const updateUser = async (id: string, data: UserData): Promise<User> => {
  const response = await userApi.patch(`/update/?id=${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  const response = await userApi.delete(`/delete/?id=${id}`);
  return response.data
};

export default userApi

