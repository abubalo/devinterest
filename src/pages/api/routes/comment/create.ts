import { NextApiRequest, NextApiResponse } from "next";
import PostController from "../../controllers/postController";

const postController = new PostController();

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await postController.createComment(req, res);
}
