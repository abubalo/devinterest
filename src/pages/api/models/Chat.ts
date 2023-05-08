import { Message } from "./Message";

export class Chat{
    private readonly id: string;
    private content: string;
    private createdAt: Date;
    private userId: number;
    private messages: Message[];

    constructor(id: string, content: string, createdAt: Date, userId: number, messages: Message[]){
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.userId = userId;
        this.messages = messages;
    }

    public getId(): string{
        return this.id;
    }

    public getContent(): string{
        return this.content;
    }

    public getCreatedAt(): Date{
        return this.createdAt;
    }
    
    public getMessages(): Message[]{
        return this.messages;
    }
}