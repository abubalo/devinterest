import { NextApiRequest, NextApiResponse } from "next";
import UserController, {ExtentendNextApiRequest} from "../../controllers/userController";

const userController = new UserController();

export default async function POST(req: ExtentendNextApiRequest, res: NextApiResponse){
    await userController.login(req, res);
}
