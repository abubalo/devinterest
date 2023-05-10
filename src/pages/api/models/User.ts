import { Post } from "./Post";
import { Chat } from "./Chat";

export class User {
  private readonly id: string;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date;
  private updatedAt?: Date;
  private follower?: User[];
  private following?: User[];
  private posts?: Post[];
  private chats?: Chat[];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    follower: User[] = [],
    following: User[] = [],
    posts: Post[] = [],
    chats: Chat[] = []
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.follower = follower;
    this.following = following;
    this.posts = posts;
    this.chats = chats;
  }

  private getId(): string {
    return this.id;
  }
  private getName(): string {
    return this.name;
  }

  private getEmail(): string {
    return this.email;
  }


  private getPassword(): string {
    return this.password;
  }
  

  private getCreatedAt(): Date {
    return this.createdAt;
  }

  private getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  private getFollowers(): User[] | undefined {
    return this.follower;
  }

  private getFollowings(): User[] | undefined{
    return this.following;
  }

  

  private getPosts(): Post[] | undefined {
    return this.posts;
  }

  private getChats(): Chat[] | undefined {
    return this.chats;
  }
}
