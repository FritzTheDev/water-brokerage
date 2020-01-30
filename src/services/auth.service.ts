import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";

import { LoginDTO, CreateUserDTO } from "../dtos";
import { User } from "../entities";
import { BadCredentialsException, EmailInUseException } from "../exceptions";

const createToken = (user: User) => {
  const id = user.id;
  return `Bearer ${jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 })}`;
}

export const login = async (userCreds: LoginDTO) => {
  const userRepo = getRepository(User);
  
  const user = await userRepo.findOne({ email: userCreds.email });
  if (!user) throw new BadCredentialsException();
  try {
    if (!(await compare(userCreds.password, user.password))) {
      throw new BadCredentialsException();
    }
  } catch (error) {
    throw error;
  }
  user.password = undefined;
  return Promise.resolve(createToken(user));
}

export const register = async (userData: CreateUserDTO) => {
  const userRepo = getRepository(User);

  const userHasEmail = await userRepo.findOne({ email: userData.email });
  if (userHasEmail) throw new EmailInUseException();
  try {
    userData.password = await hash(userData.password, 10);

    const { fullName, email, password } = userData
    const user = userRepo.create({ fullName, email, password });
    await userRepo.save(user);
    
    return Promise.resolve(createToken(user));
  } catch (error) {
    throw error;
  }
}