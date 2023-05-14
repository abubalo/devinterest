export interface Message{
    readonly id: string;
    content: string;
    createdAt: Date;
    author: number;
    chat: number;
}