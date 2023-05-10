import { NextApiRequest, NextApiResponse } from "next";
import UserController from "../../controllers/userController";

const userController = new UserController();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case "GET":
            await userController.getUserById(req, res);
            break;
        case "PATCH":
            await userController.updateUser(req, res);
            break;
    
        default:
            break;
    }
    await userController.getUserById(req, res);
}
