import { NextApiRequest, NextApiResponse } from "next";
import { PostService } from "@/pages/api/services/postService";

const postService = new PostService();

class PostController {

  public async createPost(req: NextApiRequest, res: NextApiResponse): Promise<void> {
      try {
        const { id, title, content, tags } = req.body;
        const post = await postService.createPost( id, title, content, tags);
        res.status(200).json(post);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error!" });
    }
  }

  public async getAllPosts(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const posts = await postService.getAllPosts();

        if(!posts){
            res.status(404).json({error: "There is no post!"})
        }
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error!" });
    }
  }

  public async getPostsbyAuthorId(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const {id} = req.body;
        const posts = await postService.getPostsbyAuthorId(id);

        if(!posts){
            res.status(404).json({error: "User does not have posts!"});
            return;
        }

        res.status(200).json(posts);

    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Unable to fetch posts"});
    }
  }

  public async updatePost(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const {id, author, title, content} = req.body;
        const updatedPost = await postService.updatePost(id, author, {title, content} as Record<string, number> );

        if(!updatedPost){
            res.status(404).json({error: "Post does not exist!"});
        }

        res.status(200).json(updatedPost);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Unable to update post!" });
    }
  }

  public async deletePost(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const {id, author} = req.body;
        const deletePost = await postService.deletePost(id, author);
        
        if(!deletePost){
            res.status(404).json({error: "Post does not exist!"});
        }

        res.status(200).send("Successfully deleted post");
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Unable to delete post!"});
    }
  }
}

export default PostController