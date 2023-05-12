import { NextApiRequest, NextApiResponse } from "next";
import PostController from "../../controllers/postController";

const postController = new PostController();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await postController.getAllPosts(req, res);
}
