import { NextApiRequest, NextApiResponse } from "next";
import PostController from "../../controllers/postController";



export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await PostController.getAllPosts(req, res);
}
