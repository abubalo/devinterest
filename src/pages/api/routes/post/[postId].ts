import { NextApiRequest, NextApiResponse } from "next";
import PostController from "../../controllers/postController";

const postController = new PostController();

// Handles GET, PUT, and DELETE requests for a specific post
export default async function post(req: NextApiRequest, res: NextApiResponse){
    
    switch (req.method) {
        case "GET":
            await postController.getPostsbyAuthorId(req, res);
            break;
        case "PUT":
            await postController.updatePost(req, res);
            break;
        case "DELETE":
            await postController.deletePost(req, res);
            break;
    
        default:
            res.status(405).json({error: "Invalid request method"});
            break;
    }
}