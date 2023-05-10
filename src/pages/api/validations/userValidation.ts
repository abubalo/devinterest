import Joi from "joi";
import { User } from "../models/User";

export const validateCreateUser = async (data: Partial<User>) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validateAsync(data);
};
