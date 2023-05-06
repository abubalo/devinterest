import Joi from "joi";
import { User } from "../models/User";

export const validateCreateUser = async (data: Partial<User>) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    bio: Joi.string(),
    gender: Joi.string(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    avatarUrl: Joi.string().required(),
    location: Joi.string().required(),
  });

  return schema;
};
