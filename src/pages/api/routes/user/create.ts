import { NextApiRequest, NextApiResponse } from "next";
import UserController, { ExtendedNextApiRequest } from "../../controllers/userController";

const userController = new UserController();

export default async function POST(req: ExtendedNextApiRequest, res: NextApiResponse){
    await userController.createUser(req, res);
}
