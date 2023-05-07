import { Post } from "./Post";
import { Chat } from "./Chat";

export class User {
  private readonly id: number;
  private name: string;
  private email: string;
  private bio?: string | undefined;
  private gender?: string;
  private password: string;
  private avatarUrl?: string | undefined;
  private location?: string | undefined;
  private createdAt: Date;
  private follower: User[];
  private following: User[];
  private updatedAt: Date;
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
    follower: User[],
    following: User[],
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
    this.follower = follower;
    this.following = following;
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

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }


  public getFollowers(): User[] | undefined {
    return this.follower;
  }

  public getFollowings(): User[] | undefined {
    return this.following;
  }

  public followUser(user:User): void{
      this.following.push(user);
      this.follower.push(this)
  }
  public unfollowUser(user: User): void{
    // Find index of user who unfollowed
    const userIndex = this.following.findIndex((followingUser)=> followingUser.getId() === user.getId());

    // if user aready exist, replace the user
    if(userIndex !== -1){
      this.following.splice(userIndex, 1);
    }

    const thisUserIndex = this.getFollowers()?.findIndex((follower)=> follower.getId() === user.getId());

    if(thisUserIndex !== -1){
      user.getFollowers()?.splice(thisUserIndex, 1);
    }
  }

  public getPosts(): Post[] | undefined {
    return this.posts;
  }

  public getChats(): Chat[] | undefined {
    return this.chats;
  }
}
