// import { Tag } from "@prisma/client";
import { Comment } from "./Comment";
import { User } from "./User";
export class Post {
  private readonly id: string;
  private title: string;
  private content: string;
  // private imagePost?: string | undefined;
  private readonly createdAt: Date;
  private updatedAt?: Date;
  private author: {id: string, name: string} | User;
  private tags: string[] | undefined ;
  private readonly likes?: string[];
  private readonly comments?: Partial<Comment[]> | undefined;

  constructor(id: string, title: string, content: string, createdAt: Date, updatedAt: Date, author: {id: string, name: string}, tags: string[] = [], likes: string[] = [], comments: Comment[] = []) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.author = author;
    this.tags = tags;
    this.likes = likes;
    this.comments = comments;
  }

  // public getId(): string{
  //   return this.id
  // }

  // public getTitle(): string{
  //   return this.title;
  // }
  
  // public getContent(): string{
  //   return this.content;
  // }

  // public getCreatedAt(): Date | undefined{
  //   return this.createdAt;
  // }

  // public getUpdatedAt(): Date | undefined{
  //   return this.updatedAt;
  // }

  // public getLikes(): string[] | undefined{
  //   return this.likes;
  // }

  // public getComments(): Comment[] | undefined{
  //   return this.comments;
  // }
  // public getTags(): string[] | undefined{
  //   return this.tags;
  // }

  


}