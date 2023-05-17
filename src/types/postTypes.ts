export interface Post {
    id: string;
    title: string;
    content: string;
    imagePost?: string;
    createdAt?: Date;
    updatedAt?: Date;
    authorId?: string,
    author: {
      id: string;
      name: string;
    };
    likes?: string[];
    comments?: Comment[];
    tags?: string[];
  }
  