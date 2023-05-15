import { NextApiRequest, NextApiResponse } from "next";
import UserController from "../../controllers/userController";

const userController = new UserController();

// Get all users
export default async function GET(req: NextApiRequest, res: NextApiResponse){
    await userController.getUser(req, res);
}
