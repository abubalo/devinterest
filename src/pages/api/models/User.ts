import { Post } from "./Post";
import { Chat } from "./Chat";

export class User {
  private readonly id: number;
  private name: string;
  private email: string;
  private bio?: string;
  private gender?: string;
  private password: string;
  private avatarUrl?: string;
  private location?: string;
  private createdAt: Date;
  private updatedAt?: Date;
  private posts?: Post[];
  private chats?: Chat[];

  constructor(
    id: number,
    name: string,
    bio: string,
    email: string,
    gender: string,
    password: string,
    avatarUrl: string,
    location: string,
    createdAt: Date,
    updatedAt: Date,
    posts: Post[],
    chats: Chat[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.gender = gender;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.location = location;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.posts = posts;
    this.chats = chats;
  }

  public getId(): number{
    return this.id
  }
  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }
  public getUserBio(): string | undefined {
    return this.bio;
  }
  public getGender(): string | undefined {
    return this.gender;
  }

  public getPassword(): string {
    return this.password;
  }
  public getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }
  public getLocation(): string | undefined{
    return this.location;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getPosts(): Post[] | undefined {
    return this.posts;
  }

  public getChats(): Chat[] | undefined {
    return this.chats;
  }
}
