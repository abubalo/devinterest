import post from "../routes/post/create";

export class Tags{
    private readonly id: number;
    private name: string;
    private postId: number;

    constructor(id: number, name: string, postId: number){
        this.id = id;
        this.name = name;
        this.postId = postId
    }

    public getId(): number{
        return this.id
    }

    public getTagName(): string{
        return this.name
    }

    public getPostIdInTag(): number{
        return this.postId
    }
}