import UserService from "../services/userService";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize, parse } from "cookie";
import { validateCreateUser } from "../validations/userValidation";

export interface ExtendedNextApiRequest extends NextApiRequest {
  name: string;
  email: string;
  password?: string;
}


class UserController {

  public static createUser = async (
    req: ExtendedNextApiRequest,
    res: NextApiResponse
  ): Promise<void> => {
    try {
      // validate user data
      const { error }: any = await validateCreateUser(req.body);

      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const { name, email, password } = req.body;

      const isUserExist = await UserService.getUserByEmail(email);

      if (isUserExist) {
        res.status(409).json("User already exists");
      }

      const user = await UserService.createUser(name, email, password);

      res.status(201).json(user);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json(error);
    }
  };

  public static login = async (
    req: ExtendedNextApiRequest,
    res: NextApiResponse
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await UserService.authenticateUser(email, password);

      if (!user) {
        res.status(401).json("Invalid password or email");
        return;
      }

      // Generate token ad send it back to client
      const token = await UserService.generateAccessToken(user);
      const cookie = serialize("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.setHeader("Set-Cookie", cookie);
      await res.status(200).json({ token });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json(error);
    }
  };

  public static getUser = async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> => {
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.token;

      if (!token) {
        res.status(401).json("Unathorized");
        return;
      }

      const decodedToken = await UserService.verifyAccessToken(token as string);
      const userId = decodedToken.id;
    

      const user = await UserService.getUser(userId as string);

      res.status(200).json(user);
    } catch (error: any) {
      console.log("jwt server error: ",error.message);
      res.status(500).json({ message: "Could not fetch user data" });
    }
  };

  public static getUserById = async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> => {
    const id = typeof req.query.id === "string" ? req.query.id : undefined;
    if (id == undefined) {
      res.status(400).json({ message: "Invalid or missing ID parameter" });
      return;
    }
    const user = await UserService.getUserById(id);

    res.status(200).json(user);
  };

  public static updateUser = async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> => {
    try {
      const { id, name, email, password } = req.body;
      const updateUser = await UserService.updateUser(id, {
        name,
        email,
        password,
      });

      if (!updateUser) {
        res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updateUser);
    } catch (error: any) {
      console.log("getUser: ",error.message);
      res.status(500).json({ error: "Failed to update user!" });
    }
  };

  public static deleteUser = async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> => {
    try {
      const id = typeof req.query.id === "string" ? req.query.id : undefined;
      if (id == undefined) {
        res.status(400).json({ message: "Invalid or missing ID parameter" });
        return;
      }
      const deletedUser = await UserService.deleteUser(id);

      if (!deletedUser) {
        res.status(404).json("User not found");
      }

      res.status(200).send("Success");
    } catch (error: any) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Unable to delete user, please try again!" });
    }
  };
}

export default UserController;
