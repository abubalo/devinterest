import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

interface DecodedAccessToken {
  userId: string;
  iat: number;
  exp: number;
}

const prisma = new PrismaClient();

export class UserService {
  public async createUser(
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
      // return new User(
      //   user.id,
      //   user.name,
      //   user.email,
      //   user.password,
      //   user.createdAt,
      //   user.updatedAt
      // );
    } catch (error: any) {
      console.log({ providerError: error.message });
      return error.message;
    }
  }

  public async getUser(userId: string): Promise<User | null> {
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
    // return new User(
    //   user.id,
    //   user.name,
    //   user.email,
    //   user.password,
    //   user.createdAt,
    //   user.updatedAt
    // );
  }

  public async getUserById(userId: string): Promise<User | null> {
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
    // return new User(
    //   user.id,
    //   user.name,
    //   user.email,
    //   user.password,
    //   user.createdAt,
    //   user.updatedAt
    // );
  }

  public async getUserByEmail(userEmail: string): Promise<boolean> {
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

  public async updateUser(
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
    // return new User(
    //   user.id,
    //   user.name,
    //   user.email,
    //   user.password,
    //   user.createdAt,
    //   user.updatedAt
    //   // user.follower,
    //   // user.following
    // );
  }

  public async deleteUser(userId: string): Promise<boolean | null> {
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

  public async followUser(
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

  public async authenticateUser(
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

  public async generateAccessToken(user: Partial<User>): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    const token = Jwt.sign({ sub: user }, jwtSecret, {
      expiresIn: "1h",
    });

    return token;
  }

  public async verifyAccesToken(token: string): Promise<DecodedAccessToken> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("Jwt secret is not provided");

    return new Promise((resolve, reject) => {
      Jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded as DecodedAccessToken);
        }
      });
    });
  }
}

export default UserService;
