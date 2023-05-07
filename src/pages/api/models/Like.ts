export class Like{
    private id: number;
    private postId: number;
    private userId: number;
    private likedAt?: Date;

    constructor(id: number, postId: number, userId: number, likedAt: Date){
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.likedAt = likedAt;
    }

    public getId(): number{
        return this.id
    }
    public getPostId(): number{
        return this.postId
    }
    public getUserId(): number{
        return this.userId
    }

    public getLikedAt(): Date | undefined{
        return this.likedAt;
    }
}