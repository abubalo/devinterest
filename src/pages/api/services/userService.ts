import { PrismaClient } from "@prisma/client";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export class UserService {
  SALT_ROUNDS = 10;
  salt = bcrypt.genSaltSync(this.SALT_ROUNDS);

  public async createUser(
    name: string,
    bio: string,
    email: string,
    gender: string,
    password: string,
    location: string,
  ): Promise<User> {
    const hashPasword = bcrypt.hashSync(password, this.salt);
    const user = await prisma.user.create({
      data: {
        name,
        bio,
        email,
        password: hashPasword,
        gender,
        // avatarUrl,
        location
      },
      include:{
        posts: true,
        chats: true,
        follower: true,
        following: true,
      }
    });


    return new User(
      user.id,
      user.name,
      user.email,
      user.bio,
      user.gender,
      user.password,
      user.avatarUrl,
      user.location,
      user.createdAt,
      user.updatedAt,
      user.follower,
      user.following,
      user.posts,
      user.chats
    );
  }

  public async getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include:{
        comments: true,
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
      user.bio,
      user.email,
      user.gender,
      user.password,
      user.avatarUrl,
      user.location,
      user.createdAt,
      user.updatedAt,
      user.follower,
      user.following,
      user.posts,
      user.chats
    );
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
    data: User
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
      user.bio,
      user.email,
      user.gender,
      user.password,
      user.avatarUrl,
      user.location,
      user.createdAt,
      user.updatedAt,
      user.follower,
      user.following,
      user.posts,
      user.chats
    );
    
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
      throw new Error(`User with ID ${userId} not found`);
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
    // get the id of user who wants to unfollow another user, and the id of account they want to unfollow. It then updates the user's following field in the database by removing the targetUserId to the list of users they are following.
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

  public generateAccessToken(user: User): string {
    const jtwSecret = process.env.JWT_SECRET;

    if (!jtwSecret) {
      throw new Error("JWT is not define");
    }
    const token = Jwt.sign({ sub: user.getId() }, jtwSecret, {
      expiresIn: "1h",
    });

    return token;
  }

//   public verifyAccessToken(token: string): Promise<boolean | null> {
//     // code goes here
//     if(token){
//         return null
//     }
//   }
}

export default UserService;
