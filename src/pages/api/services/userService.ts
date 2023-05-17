import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import Jwt,{JwtPayload} from "jsonwebtoken";

interface DecodedAccessToken extends User {
  sub: User;
  iat: number;
  exp: number;
} 
interface DecodedToken {
  sub: Partial<Omit<User, 'password'>>;
  iat: number;
  exp: number;
} 

const prisma = new PrismaClient();

export class UserService {
  public static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | Error> {
    try {
      const saltRounds = 10;

      const salt = bcrypt.genSaltSync(saltRounds);

      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return user
  
    } catch (error: any) {
      console.log({ providerError: error.message });
      return error.message;
    }
  }

  public static async getUser(userId: string): Promise<User | null> {
    console.log("the userId is: ", userId)
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        follower: true,
        following: true,
        posts: true,
        chats: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
    
  }

  public static async getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      include: {
        follower: true,
        following: true,
        posts: true,
        chats: true,
      },
    });

    if (!user) {
      return null;
    }
    return user;
    
  }

  public static async getUserByEmail(userEmail: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return false;
    }

    return true;
  }

  public static async updateUser(
    userId: string,
    data: Partial<User>
  ): Promise<User | null> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: { ...data },
      include: {
        comments: true,
        follower: true,
        following: true,
        posts: true,
        chats: true,
      },
    });

    if (!user) {
      console.log(`Could not update user with ID ${userId}`);
      return null;
    }

    return user;
  }

  public static async deleteUser(userId: string): Promise<boolean | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return true;
  }

  public static async followUser(
    userId: string,
    targetId: string
  ): Promise<void | null> {
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

  public static async unfollowUser(userId: string, targetId: string): Promise<void> {
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

  public static async authenticateUser(
    userEmail: string,
    password: string
  ): Promise<User | null> {
    // Todo add verify access token

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return null;
    }

    const passwordMatches = bcrypt.compareSync(password, user.password);

    if (!passwordMatches) {
      console.log("Password does not match");
      return null;
    }

    return user;
  }

  public static async generateAccessToken(user: Partial<User>): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    const token = Jwt.sign({ sub: user }, jwtSecret, {
      expiresIn: "24h",
    });

    return token;
  }

  public static async verifyAccessToken(token: string): Promise<Partial<Omit<User, 'password'>>> {
    const jwtSecret = process.env.JWT_SECRET;
  
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }
  
    try {
      const decoded: DecodedToken = Jwt.verify(token, jwtSecret) as DecodedToken;
      return decoded.sub;
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }
}

export default UserService;
