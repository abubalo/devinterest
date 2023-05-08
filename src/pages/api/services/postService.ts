import { PrismaClient } from "@prisma/client";
import { Post } from "../models/Post";
import { Like } from "../models/Like";
import { Tags } from "../models/Tags";

interface IPost {
  id: string;
  title: string;
  content: string;
  author: Date;
  createdAt: Date;
  updatedAt: number;
  likes: Like[] | undefined;
  comments: Comment[] | undefined;
}

const prisma = new PrismaClient();

export class PostService {
  public async createPost(
    authorId: string,
    title: string,
    content: string,
    tags: Tags[]
  ): Promise<Partial<Post>> {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
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
      },
    });

    await this.createTags(authorId, tags);

    return new Post(
      post.id,
      post.title,
      post.content,
      post.createdAt,
      post.updatedAt,
      post.author,
      post.tags,
      post.comments
    );
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
        // author: true,
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
          post.tags,
          post.comments
        )
    );
  }

  public async updatePost(
    postId: string,
    authorId: string,
    data: Partial<Post>
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
        post.comments,
        post.tags
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

  public async deletePost(
    postId: string,
    authorId: string
  ): Promise<boolean | null> {
    const deletePost = await prisma.post.findUnique({
      where: {
        id: postId,
        // authorId
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
    authorId: string,
    postId: string
  ): Promise<Comment> {
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
      },
    });

    // const {id, conent, author, post, createdAt, replies} = comment

    const newComment = new Comment();
    // comment.id,
    // comment.content,
    // comment.author,
    // comment.post,
    // comment.createdAt,
    // comment.replies

    return newComment;
  }

  public async createTags(postId: string, postTags: Tags[]): Promise<Tags[]> {
    let newTags = [];

    for (let i = 0; i < postTags.length; i++) {
      const tag = postTags[i];

      await prisma.tag.create({
        data: {
          name: tag,
          postId,
        },
      });

      newTags.push(tag);
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
