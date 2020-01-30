import { Response, Request, NextFunction } from "express";
import { login, register } from "../services";
import { LoginDTO, CreateUserDTO } from "../dtos";

export const loginHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userCreds: LoginDTO = request.body;
    const token = await login(userCreds);
    response.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const registrationHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userData: CreateUserDTO = request.body;
    const token = await register(userData);
    response.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
