import { User } from "./User";
import { Post } from "./Post";

export class Comment {
  private readonly id: string;
  private content: string;
  private readonly author: Partial<User>;
  private readonly post: Partial<Post>;
  private readonly like: string[];
  private readonly createdAt: Date;
  // private readonly updatedAt?: Date;
  private replyId: string | undefined;
  private replies?: Comment[] | undefined;
  private parentCommentId: string | undefined;
  private parentComment?: Comment | undefined;

  constructor(
    id: string,
    content: string,
    author: Partial<User>,
    post: Partial<Post>,
    like: string[],
    createdAt: Date,
    replyId: string | undefined,
    replies: Comment[] | undefined,
    parentCommentId: string | undefined,
    parentComment: Comment | undefined
  ) {
    this.id = id;
    this.content = content;
    this.author = author;
    this.post = post;
    this.like = like;
    this.createdAt = createdAt;
    this.replyId = replyId;
    this.replies = replies;
    this.parentCommentId = parentCommentId;
    this.parentComment = parentComment;
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

  public getAuthor(): Partial<User>  {
    return this.author;
  }

  public getPost(): Partial<Post> {
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

