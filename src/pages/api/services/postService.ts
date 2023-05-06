import { PrismaClient } from "@prisma/client"
import { Post } from "../models/Post";
import { Like } from "../models/Like";
import { Tags } from "../models/Tags";

interface IPost {
    id: number; 
    title: string; 
    content: string; 
    author: Date; 
    createdAt: Date; 
    updatedAt: number; 
    likes: Like[] | undefined; 
    comments: Comment[] | undefined; 
}


const prisma = new PrismaClient();

export class PostService{

    public async createPost(author: number, title: string, content: string, tags: Tags[]): Promise<Partial<Post>>{

        const post = await prisma.post.create({
            title,
            content,
            author,         
        })

        await this.createTags(author, tags)

        return new Post(post.id, post.title, post.content, post.author, post.createdAt, post.likes, post.comments)
    }

    public async getAllPosts(): Promise<Post[] | null >{

        const posts = await prisma.post.findMany({
            include:{
                authorId: true,
                likes: true,
                comments: true,
            }
        });

        if (posts.length === 0) {
            return null;
        }

        return posts;

    }

    public async getPostsbyAuthorId(authorId: number): Promise<Post[] | null >{
        const posts = await prisma.post.findMany({
            where:{
                authorId: authorId,
            },

            include:{
                authorId: true,
                likes: true,
                comments: true,
            }
        })

        if(!posts){
            return null;
        }

        return posts.map((post: IPost ) => new Post(post.id, post.title, post.content, post.author, post.createdAt, post.updatedAt, post.likes, post.comments))
    }

    public async updatePost(postId: number, authorId: number, data: Partial<Omit<Post, "id" | 'createdAt' | "likes" | 'comments'>>): Promise<Post | null>{
        const post = await prisma.post.update({
            where:{
                id: postId,
                author: authorId,
                    
            },
            data:{
                ...data
            }
        })

        if(!post){
            return null;
        }
        
        return new Post(post.id, post.title, post.content, post.author, post.createdAt, post.likes, post.comments);

    }

    public async deletePost(postId: number, authorId: number): Promise<boolean | null>{
        const deletePost = await prisma.post.findUnique({
            where:{
                id: postId,
                author: authorId,     
            }
        })

        if(!deletePost){
            return null;
        }

        await prisma.post.delete({
            where:{
                id: postId,
                author: authorId,     
            }
        })

        return true;
    }

    public async createTags(postId: number, postTags: Tags[]): Promise<Tags[]>{
        let newTags = [];

        for (let i = 0; i < postTags.length; i++) {
            const tag = postTags[i];
            
            await prisma.tag.create({
               data:{
                name: postTags,
                postId
               }
            })

            
            newTags.push(tag)
        }

        return newTags;
        
        
    }
}