export class Like{
    private id: string;
    private postId: string;
    private userId: string;
    private likedAt?: Date;

    constructor(id: string, postId: string, userId: string, likedAt: Date){
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.likedAt = likedAt;
    }

    public getId(): string{
        return this.id
    }
    public getPostId(): string{
        return this.postId
    }
    public getUserId(): string{
        return this.userId
    }

    public getLikedAt(): Date | undefined{
        return this.likedAt;
    }
}