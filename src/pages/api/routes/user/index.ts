import { NextApiRequest, NextApiResponse } from "next";
import UserController from "../../controllers/userController";



// Get all users
export default async function GET(req: NextApiRequest, res: NextApiResponse){
    await UserController.getUser(req, res);
}
