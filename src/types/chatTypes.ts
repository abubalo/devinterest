import { Message } from "./userTypes";

export interface Chat{
    readonly id: string;
    content: string;
    createdAt: Date;
    userId: number;
    messages: Message[];
}