import { PrismaClient } from "@prisma/client"
import { User } from "../models/User";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// interface IUser extends Pick<Partial<User>>;

const prisma = new PrismaClient();

export class UserService{

     SALT_ROUNDS = 10;
     salt = bcrypt.genSaltSync(this.SALT_ROUNDS);

    public async createUser(name: string, bio: string, email: string, gender: string, avatarUrl: string, password: string, location: string ): Promise<User>{
        const hashPasword = bcrypt.hashSync(password, this.salt)
        const user = await prisma.user.create({
            data:{
                name,
                bio,
                email,
                gender,
                avatarUrl,
                hashPasword,
                location,
            }
        });

        return new User(user.id, user.name, user.email, user.bio, user.gender, user.password, user.avatarUrl,  user.location, user.createdAt, user.updated_at, user.posts, user.chats)
    }

    public async getUserById(userId: number): Promise<User | null>{
        const user = await prisma.user.findUnique({
            where:{
                id: userId,
            }
        })

        if(!user){
            return null

        }

        return new User(user.id, user.name, user.email, user.bio, user.gender, user.password, user.avatarUrl,  user.location, user.createdAt, user.updated_at, user.posts, user.chats)
    }

    public async getUserByEmail(userEmail: string): Promise<boolean | null>{
        const user = await prisma.user.findUnique({
            where:{
                email: userEmail,
            }
        })

        if(!user){
            return null;
        }

        return true;
    }


    public async updateUser(userId: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'chats' | 'posts'>>): Promise<User | null>{
        
        const user = await prisma.user.update({
            where:{
                id: userId,
            },
            ...data
        })

        if(!user){
            console.log(`Could not update user with ID ${userId}`);
            return null;

        }

        return new User(user.id, user.name, user.email, user.bio, user.gender, user.password, user.avatarUrl,  user.location, user.createdAt, user.updated_at, user.posts, user.chats)
    }

    public async deleteUser(userId:number): Promise<boolean | null>{
        const user = await prisma.user.findUnique({
            where:{
                id: userId,
            }
        })

        if(!user){
            return null;
        }

        await prisma.user.delete({
            where:{
                id: userId
            }
        })

        return true;
    }

    public async authenticateUser(userEmail: string, password: string): Promise<User | null>{
       
        const user = await prisma.user.findUnique({
            where:{
                email: userEmail
            }
        })

        if(!user){
            return null;
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if(!passwordMatches){
            return null;
        }

        return user
    }

    public generateAccessToken(user: User): string{
        const jtwSecret = process.env.JWT_SECRET;

        if(!jtwSecret){
            throw new Error("JWT is not define");
        }
        const token = Jwt.sign({sub: user.getId()}, jtwSecret, {expiresIn: "1h"});

        return token;
    }

    public verifyAccessToken(token: string){
        // code goes here
    }
    
}

export default UserService;