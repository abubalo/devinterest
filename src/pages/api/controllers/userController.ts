import UserService from "@/pages/api/services/userService";
import { NextApiRequest, NextApiResponse } from "next";
import { validateCreateUser } from "../validations/userValidation";

export interface ExtentendNextApiRequest extends NextApiRequest{
    name: string;
    email: string;
    bio: string;
    gender?: string;
    password: string;
    avatarUrl?: string;
    location: string;
}
const userService = new UserService();

class UserController{

     public createUser = async (req: ExtentendNextApiRequest, res:NextApiResponse): Promise<void> =>{

        try {
            

            const {error}: any = await validateCreateUser(req.body);

            if(error){
                res.status(400).json({ error: error.details[0].message });
                return;
            }
            const {name, email, bio, gender, password, avatarUrl, location} = req.body;
    
            const isUserExist = await userService.getUserByEmail(email);
    
            if(isUserExist){
                res.status(409).json("User already exists");
            }
    
            const user = await userService.createUser(name, email, bio, gender, password, avatarUrl, location);
    
            res.status(201).json(user);
    
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json(error);
        }
    
    }
    
     public login = async (req: NextApiRequest, res:NextApiResponse): Promise<void> =>{
        try {
            const {email, password} = req.body;
            const user = await userService.authenticateUser(email, password);
    
            if(!user){
                res.status(401).json("Invalid password or email");
                return;
            }
    
            // Generate token ad send it back to client       
            const token = await userService.generateAccessToken(user);
            await res.status(200).json({token});
    
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json(error);  
        }
    
        
    }

     public getUserById = async (req: NextApiRequest, res:NextApiResponse): Promise<void> =>{
        const id = typeof req.query.id === 'string' ? req.query.id : undefined;
        if(id == undefined){
            res.status(400).json({ message: 'Invalid or missing ID parameter' });
            return;
        }
        const user = await userService.getUserById(id);

        res.status(200).json(user);
    
    }
    
     public updateUser = async (req: NextApiRequest, res:NextApiResponse): Promise<void> =>{
        try {
            const {id, name, email, bio, gender, avatarUrl, location} = req.body;
            const updateUser = await userService.updateUser(id, {name, bio, email, gender, avatarUrl, location} as Record<string, any>);
    
            if(!updateUser){
                res.status(404).json({error: "User not found"});
            }
    
            res.status(200).json(updateUser);
    
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({error: "Failed to update user!"})
        }
    
    }
    
     public deleteUser = async (req: NextApiRequest, res:NextApiResponse): Promise<void> =>{
        try {
            const {id} = req.body
            const deletedUser = await userService.deleteUser(id);
    
            if(!deletedUser){
                res.status(404).json("User not found");
            }
    
            res.status(200).send("Success")
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({error: "Unable to delete user, please try again!"})
        }
    }
}

export default UserController
