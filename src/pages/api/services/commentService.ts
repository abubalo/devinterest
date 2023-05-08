import { PrismaClient } from "@prisma/client";
import { Comment } from "../models/Comment";

const prisma = new PrismaClient();

export class CommentService{

    public async createComment(content: string, author: number, post: number): Promise<Comment>{
        const comment = await prisma.comment.create({
            content,
            author,
            post,
        })
        return new Comment(comment.id, comment.content, comment.author, comment.post, comment.createdAt);
    }

    // public async getComments(): Promise<Comment | null>{
    //     const comment = new prisma.comment.findMany();

    //     return comment
    // }


}