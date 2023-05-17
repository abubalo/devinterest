import { NextApiRequest, NextApiResponse } from "next";
import PostController from "../../controllers/PostController";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await PostController.createComment(req, res);
}
