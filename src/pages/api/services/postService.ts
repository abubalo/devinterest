import { PrismaClient } from "@prisma/client";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";

const prisma = new PrismaClient();

export class PostService {
  public async createPost(
    title: string,
    content: string,
    authorId: string,
    tags: string[],
  ): Promise<Post | void> {

    console.log({title, content, authorId, tags});
    const post = await prisma.post.create({
      data: {
        title,
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
    return new Post(
      post.id,
      post.title,
      post.content,
      post.createdAt,
      post.updatedAt,
      post.author,
      post.tags,
      post.likes,
      // post.comments,
    );

    // return post
  }


  public async getAllPosts(): Promise<Post[] | null> {
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

    return posts.map(
      (post) =>
        new Post(
          post.id,
          post.title,
          post.content,
          post.createdAt,
          post.updatedAt,
          post.author,
          post.tags,
          post.likes,
          post.comments,
        )
    );

  }

  public async getPostsbyId(postId: string): Promise<Post[] | null> {
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

    return posts.map(
      (post) =>
        new Post(
          post.id,
          post.title,
          post.content,
          post.createdAt,
          post.updatedAt,
          post.author,
          post.likes,
          post.tags,
          post.comments
        )
    );
  }

  public async getPostsbyAuthorId(authorId: string): Promise<Post[] | null> {
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

    return posts.map(
      (post) =>
        new Post(
          post.id,
          post.title,
          post.content,
          post.createdAt,
          post.updatedAt,
          post.author,
          post.likes,
          post.tags,
          post.comments
        )
    );

    // return posts
  }
  

  public async updatePost(
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

      return new Post(
        post.id,
        post.title,
        post.content,
        post.createdAt,
        post.updatedAt,
        post.author,
        post.tags,
        post.likes,
        post.comments,
      );

      // return post
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async deletePost( postId: string, authorId: string): Promise<boolean | null> {

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

  public async createComment(
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
            title: true,
          },
        },
        replies: true,
        like: true
      },
    });

    // const {id, conent, author, post, createdAt, replies} = comment

    // const newComment = new Comment(comment.id, comment.content, comment.author, comment.post, comment.createdAt, comment.replies, comment.likes);
    // comment.id, comment.content, comment.author, comment.post, comment.createdAt, comment.replies

    return comment;
  }

  public async createTags(
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

  public async addReply(
    authorId: string,
    postId: string,
    commentId: string | string[]
  ): Promise<void> {}

  // public bookmarkedPost(): Post{

  // }
}
