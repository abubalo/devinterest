import { NextApiRequest, NextApiResponse } from "next";
import { PostService } from "@/pages/api/services/postService";

const postService = new PostService();

class PostController {

  public async createPost(req: NextApiRequest, res: NextApiResponse): Promise<void> {
      try {
        const { title, content, authorId, tags } = req.body;
        const post = await postService.createPost( title, content, authorId, tags);
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

  public async getPostsbyId(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const id = typeof req.query.id
        
        if(id == undefined){
          res.status(400).json({ message: 'Invalid request or missing ID parameter' });
          return;
        }
        const posts = await postService.getPostsbyId(id);

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

  public async createComment(req: NextApiRequest, res:NextApiResponse): Promise<void>{
    const {content, postId, authorId} = req.body;
    try {
      const comment = await postService.createComment(content, postId, authorId)

    if(!comment){
      res.status(404).json({error: "User not or post not found"})
    }
    res.status(200).json(comment);

    } catch (error: any) {
      console.log(error.message);
      res.status(500).json("Unable to create comment")
    }

    
  }
}

export default PostController