import { compare } from "bcrypt";
import {
  Strategy as JwtStrategy,
  StrategyOptions,
  ExtractJwt
} from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { PassportStatic } from "passport";
import { getRepository } from "typeorm";
import { User } from "../entities";

const verifyPassword = async (user: User, password: string): Promise<Boolean> =>
  await compare(password, user.password);

export const configurePassportLocal = (passport: PassportStatic) => {
  const userRepository = getRepository(User);
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await userRepository.findOne({ email });
        if (!user) return done(null, false);
        if (!(await verifyPassword(user, password))) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};

export const configurePassportJwt = (passport: PassportStatic) => {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };
  const userRepository = getRepository(User);
  passport.use(
    new JwtStrategy(options, (jwtPayload: any, done) => {
      try {
        console.log(jwtPayload);
        const user = userRepository.findOne({ id: jwtPayload.id });
        // no user
        if (!user) return done(null, false);
        // success
        return done(null, user);
      } catch (error) {
        // error
        done(error);
      }
    })
  );
};
