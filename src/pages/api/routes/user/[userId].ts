import { NextApiRequest, NextApiResponse } from "next";
import UserController from "../../controllers/userController";

const userController = new UserController();

export default async function login(req: NextApiRequest, res: NextApiResponse){
    await userController.login(req, res);
}
