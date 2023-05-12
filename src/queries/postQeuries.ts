import { Post } from "@prisma/client";
import axios from "axios";

export type CreatePostData = Pick<Post, "authorId"  | "content" | "tags">;

const postApi = axios.create({
  baseURL: "http://localhost:3000/api/post",
});

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await postApi.get("/index");
  return response.data;
};

export const addPost = async (data: CreatePostData): Promise<Post> => {
  const response = await postApi.post(`/create`, data);
  return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await postApi.get(`/index/?id=${id}`);
  return response.data;
};

export const getPostsByAuthor = async (id: string): Promise<Post[]> => {
  const response = await postApi.get(`/index/?id=${id}`);
  return response.data;
};

export const updatePost = async (id: string): Promise<Post> => {
  const response = await postApi.patch(`/index/?id=${id}`);
  return response.data;
};

export const deletePost = async (id: string): Promise<Post | void> => {
  return await postApi.delete(`/index/?id=${id}`);
};

export default postApi;
