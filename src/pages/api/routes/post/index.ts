import { NextApiRequest, NextApiResponse } from "next";
import { PostService } from "../../services/postService";

const postService = new PostService();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await postService.getAllPosts();
}
