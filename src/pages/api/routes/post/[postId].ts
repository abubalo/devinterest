import { NextApiRequest, NextApiResponse } from "next";
import PostController from "../../controllers/postController";



// Handles GET, PUT, and DELETE requests for a specific post
export default async function post(req: NextApiRequest, res: NextApiResponse){
    
    switch (req.method) {
        case "GET":
            await PostController.getPostsbyId(req, res);
            break;
        case "PUT":
            await PostController.updatePost(req, res);
            break;
        case "DELETE":
            await PostController.deletePost(req, res);
            break;
    
        default:
            res.status(405).json({error: "Invalid request method"});
            break;
    }
}