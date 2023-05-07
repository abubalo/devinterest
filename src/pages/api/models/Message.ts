export class Message{
    private readonly id: number;
    private content: string;
    private createdAt: Date;
    private author: number;
    private chat: number;

    constructor(id: number, content: string, createdAt: Date, author: number, chat: number){
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.author = author;
        this.chat = chat;
    }
}