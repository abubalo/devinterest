import { User } from "./User";

export class Profile {
  private readonly id: string;
  private bio?: string | undefined;
  private gender?: string | undefined;
  private avatarUrl?: string | undefined;
  private location?: string | undefined;
  private createdAt: Date;
  private updatedAt: Date;
  private user: User;

  constructor(
    id: string,
    bio: string,
    gender: string,
    avatarUrl: string,
    location: string,
    createdAt: Date,
    updatedAt: Date,
    user: User
  ) {
    this.id = id;
    this.bio = bio;
    this.gender = gender;
    this.avatarUrl = avatarUrl;
    this.location = location;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }

  public getId(): string {
    return this.id;
  }

  public getBio(): string | undefined {
    return this.bio;
  }

  public setBio(bio: string): void {
    this.bio = bio;
  }

  public getGender(): string | undefined {
    return this.gender;
  }

  public setGender(gender: string): void {
    this.gender = gender;
  }

  public getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }

  public setAvatarUrl(avatarUrl: string): void {
    this.avatarUrl = avatarUrl;
  }

  public getLocation(): string | undefined {
    return this.location;
  }

  public setLocation(location: string): void {
    this.location = location;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getUser(): User {
    return this.user;
  }
}
