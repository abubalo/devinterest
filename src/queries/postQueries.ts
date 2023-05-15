import { Post } from "../types/postTypes";
import axios from "axios";

export type CreatePostData = Pick<Post, "author"  | "content" | "tags">;

const postApi = axios.create({
  baseURL: "http://localhost:3000/api/routes/post",
});

export const getAllPosts = async (): Promise<Post[] | null> => {
  try {
    const response = await postApi.get("");
    return response.data;
    
  } catch (error: any) {
    console.log(error.message)
    return null
  }
};

export const addPost = async (data: CreatePostData): Promise<Post | null> => {
  try {
    const response = await postApi.post(`/create`, data);
    return response.data;
    
  } catch (error: any) {
    console.log(error.message)
    return null
  }
};

export const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const response = await postApi.get(`/index/?id=${id}`);
    return response.data;
    
  } catch (error: any) {
    console.log(error.message)
    return null
  }
};

export const getPostsByAuthor = async (id: string): Promise<Post[] | null> => {
  try {
    const response = await postApi.get(`/index/?id=${id}`);
    return response.data;
    
  } catch (error: any) {
    console.log(error.message)
    return null
  }
};

export const updatePost = async (id: string): Promise<Post | null> => {
  try {
    const response = await postApi.patch(`/index/?id=${id}`);
    return response.data;
    
  } catch (error: any) {
    console.log(error.message)
    return null
  }
};

export const deletePost = async (id: string): Promise<void> => {
  return await postApi.delete(`/index/?id=${id}`);
};

export default postApi;
