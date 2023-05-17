import { PrismaClient } from "@prisma/client";
import { Comment } from "../models/Comment";
import { Post } from "@prisma/client";

const prisma = new PrismaClient();

export default class PostService {
  public static async createPost(
    content: string,
    authorId: string,
    tags: string[],
  ): Promise<Post | void> {


    const post = await prisma.post.create({
      data: {
        content,
        author:{
          connect: {id: authorId}
        },
        tags:{
          create: tags ? tags.map(tagName => ({ name: tagName })) : []
      },
      },
      
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: true,
        tags: true,
        likes: true
      },
    });
    

    return post
  }


  public static async getAllPosts(): Promise<Post[] | null> {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        likes: true,
        tags: true,
        comments: true,
      },
    });

    if (posts.length === 0) {
      return null;
    }

    return posts

  }

  public static async getPostsbyId(postId: string): Promise<Post[] | null> {
    const posts = await prisma.post.findMany({
      where: {
        authorId: postId,
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: true,
        likes: true,
        comments: true,
      },
    });

    if (!posts) {
      return null;
    }

    return posts
  }

  public static async getPostsbyAuthorId(authorId: string): Promise<Post[] | null> {
    const posts = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: true,
        likes: true,
        comments: true,
      },
    });

    if (!posts) {
      return null;
    }

    return posts
  }
  

  public static async updatePost(
    postId: string,
    authorId: string,
    data: object
  ): Promise<Post | null> {
    try {
      const post = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          ...data,
          authorId: authorId,
        },
        
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          tags: true,
          comments: true,
          likes: true,
        },
      });

      if (!post) {
        return null;
      }
      return post;

    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public static async deletePost( postId: string, authorId: string): Promise<boolean | null> {

    const postOwner = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!postOwner) {
      return null;
    }

    const deletePost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!deletePost) {
      return null;
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return true;
  }

  public static async createComment(
    content: string,
    postId: string,
    authorId: string
  ): Promise<Comment | object> {

    const comment = await prisma.comment.create({
      data: {
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
          },
        },
        replies: true,
        like: true
      },
    });

    return comment;
  }

  public static async createTags(
    postId: string,
    postTags: string[]
  ): Promise<string[]> {
    let newTags = [];

    for (let i = 0; i < postTags.length; i++) {
      const tagName = postTags[i];

      await prisma.tag.create({
        data: {
          name: tagName,
          posts:{
            connect:{id: postId}
          }
        },
      });

      newTags.push(tagName);
    }

    return newTags;
  }

  public static async addReply(
    authorId: string,
    postId: string,
    commentId: string | string[]
  ): Promise<void> {}

  // public static bookmarkedPost(): Post{

  // }
}
