import { User } from "./User";
import { Post } from "./Post";

export class Comment {
  private readonly id: string;
  private content: string;
  private readonly author: User;
  private readonly post: Post;
  private readonly createdAt: Date;
  private replies?: Comment[] | undefined;

  constructor(
    id: string,
    content: string,
    author: User,
    post: Post,
    createdAt: Date,
    replies: Comment[] = []
  ) {
    this.id = id;
    this.content = content;
    this.author = author;
    this.post = post;
    this.createdAt = createdAt;
    this.replies = replies;
  }

  public getId(): string {
    return this.id;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public getAuthor(): User {
    return this.author;
  }

  public getPost(): Post {
    return this.post;
  }

  public getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  public getReplies(): Comment[] | undefined {
    return this.replies;
  }

  public addReply(reply: Comment): void{
    this.replies?.push(reply);
  }

}

