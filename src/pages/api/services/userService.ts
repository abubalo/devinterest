import { PrismaClient } from "@prisma/client";
import { User } from "../models/User";
import { Profile } from "../models/Profile";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export class UserService {
  
  public async createUser(name: string, email: string, password: string): Promise<User | void | Error> {

    try {   
      const saltRounds = 10;

      const salt = bcrypt.genSaltSync(saltRounds);
      
      const hashedPassword = bcrypt.hashSync(password, salt).slice(0, 30);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        }
      });
      return new User(
        user.id,
        user.name,
        user.email,
        user.password,
        user.createdAt,
        user.updatedAt
        )
    } catch (error: any) {
        console.log({providerError: error.message});
        return error.message
    }

  }

  public async getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include:{
        follower: true,
        following: true,
        posts: true,
        chats: true,
        
      }
    });

    if (!user) {
      return null;
    }

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    )
  }

  public async getUserByEmail(userEmail: string): Promise<boolean | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
 
    if (!user) {
      return null;
    }

    return true;
  }

  public async updateUser(
    userId: string,
    data: Partial<User>
  ): Promise<User | null> {
    const user = await prisma.user.update({
      where:{
        id: userId
      },
     data:{...data},
     include:{
        comments: true,
        follower: true,
        following: true,
        posts: true,
        chats: true,
     }  
    }
    );
  
    if (!user) {
      console.log(`Could not update user with ID ${userId}`);
      return null;
    }
    
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
      // user.follower, 
      // user.following
    )
    
  }

  public async deleteUser(userId: string): Promise<boolean | null> {
    const user = await prisma.user.findUnique({
      where:{
        id: userId
      }
    });

    if (!user) {
      return null;
    }

    await prisma.user.delete({
      where: {
        id: userId,
      }
    });

    return true;
  }

  public async followUser(userId: string, targetId: string): Promise<void | null> {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    
    if (!currentUser) {
      return null;
    }
    
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          connect: {
            id: targetId,
          },
        },
      },
    });
    
    await prisma.user.update({
      where: {
        id: targetId,
      },
      data: {
        follower: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async unfollowUser(userId: string, targetId: string): Promise<void> {
    
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    
    if (!currentUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          disconnect: {
            id: targetId,
          },
        },
      },
    });
    
    await prisma.user.update({
      where: {
        id: targetId,
      },
      data: {
        follower: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }

  public async authenticateUser(userEmail: string ,password: string): Promise<boolean | null> {
    // Todo add verify access token

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return null;
    }

    return true;
  }

  public async generateAccessToken(user: Partial<User>): Promise<string> {
    const jtwSecret = process.env.JWT_SECRET;

    if (!jtwSecret) {
      throw new Error("JWT is not define");
    }
    const token: string = Jwt.sign({ sub: user }, jtwSecret, {
      expiresIn: "1h",
    });

    return token;
  }


}

export default UserService;
