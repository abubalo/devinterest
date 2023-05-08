import { PrismaClient } from "@prisma/client";
import { Like } from "./Like";
import { Tags } from "./Tags";
import { User } from "./User";
export class Post {
  private readonly id: string;
  private title: string;
  private content: string;
  private imagePost?: string | undefined;
  private createdAt?: Date;
  private updatedAt?: Date;
  private likes?: Like[] | undefined;
  private comments?: Comment[] | undefined;
  private tags?: Tags[] | undefined ;
  private author: Partial<User>;

  constructor(id: string, title: string, content: string, createdAt: Date, updatedAt: Date, author: Partial<User>, likes: Like[] = [], comments: Comment[] = [], tags: Tags[] = []) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.author = author;
    this.likes = likes;
    this.comments = comments;
    this.tags = tags;
  }

  public getId(): string{
    return this.id
  }

  public getTitle(): string{
    return this.title;
  }
  
  public getContent(): string{
    return this.content;
  }

  public getCreatedAt(): Date | undefined{
    return this.createdAt;
  }

  public getUpdatedAt(): Date | undefined{
    return this.updatedAt;
  }

  public getLikes(): Like[] | undefined{
    return this.likes;
  }

  public getComments(): Comment[] | undefined{
    return this.comments;
  }
  public getTags(): Tags[] | undefined{
    return this.tags;
  }
  public getAuthor(): Partial<User>{
    return this.author;
  }

  


}
