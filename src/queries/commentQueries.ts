import axios from "axios"
import { Comment } from "@prisma/client";

const commentApi = axios.create({
    baseURL: "http://localhost:3000/api/comment"
})

// export const getComments = async (): Promise<Comment[]> =>{
//     const response = await commentApi.get('/index');
//     return response.data;
// }

export const getCommentsByPostId = async (postId: string): Promise<Comment> =>{
    const response = await commentApi.get(`/index/?id=${postId}`,);
    return response.data;
}

export const addComment = async (data: Comment): Promise<Comment> =>{
    const response = await commentApi.post('/create', data);
    return response.data;
}

export const deleteComment = async (id: string): Promise<Comment> =>{
    const response = await commentApi.delete(`/index/?id=${id}`);
    return response.data;
}