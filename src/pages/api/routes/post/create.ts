import { NextApiRequest, NextApiResponse } from "next";
import PostController from "../../controllers/postController";



export default async function post(req: NextApiRequest, res: NextApiResponse) {
  await PostController.createPost(req, res);
}
