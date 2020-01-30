import {
  Strategy as JwtStrategy,
  StrategyOptions,
  ExtractJwt
} from "passport-jwt";
import { PassportStatic } from "passport";
import { getRepository } from "typeorm";
import { User } from "../entities";

export const configurePassport = (passport: PassportStatic) => {
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
