import { NextApiRequest, NextApiResponse } from "next";
import UserController, { ExtendedNextApiRequest } from "../../controllers/userController";



export default async function POST(req: ExtendedNextApiRequest, res: NextApiResponse){
    await UserController.createUser(req, res);
}
