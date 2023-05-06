import { Like } from "./Like";
import { Tags } from "./Tags";

export class Post {
  private readonly id: number;
  private title: string;
  private content: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private likes?: Like[];
  private comments?: Comment[];
  private tags?: Tags[];
  private author: number;

  constructor(id: number, title: string, content: string, createdAt: Date, updatedAt: Date, author: number, likes: Like[] = [], comments: Comment[] = [], tags: Tags[] = []) {
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

  public getId(): number{
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
  public getAuthor(): number{
    return this.author;
  }



}
