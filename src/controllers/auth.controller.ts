import { Response, Request, NextFunction } from "express";
import { login } from "../services";
import { LoginDTO, CreateUserDTO } from "../dtos";

export const loginHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userCreds: LoginDTO = request.body;
  try {
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
  const userData: CreateUserDTO = request.body;
  try {
    const token = await register()
  }
};
