import {User} from "./userTypes"
import {Post} from "./postTypes"

export type Comment = {
    readonly id: string;
    content: string;
    readonly author: Partial<User>;
    readonly post: Partial<Post>;
    readonly like: string[];
    readonly createdAt: Date;
    // readonly updatedAt?: Date;
    replyId: string | undefined;
    replies?: Comment[] | undefined;
    parentCommentId: string | undefined;
    parentComment?: Comment | undefined;

}