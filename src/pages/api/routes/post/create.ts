import { NextApiRequest, NextApiResponse } from "next";
import PostController from "../../controllers/postController";

const postController = new PostController();

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  await postController.createPost(req, res);
}
