import { User } from "./User";
import { Post } from "./Post";

export class Comment {
  private readonly id: number;
  private content: string;
  private readonly author: User;
  private readonly post: Post;
  private readonly createdAt?: Date;
  private replies: Comment[];

  constructor(
    id: number,
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

  public getId(): number {
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

  public getReplies(): Comment[] {
    return this.replies;
  }

  public addReply(reply: Comment): void {
    this.replies.push(reply);
  }

}

