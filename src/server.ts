import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import { createConnection } from "typeorm";

import { ormConfig } from "./util/ormConfig";
import { validateEnv } from "./util/validateEnv";
import { authRoutes, userRoutes, westlandsAccountRoutes, listingRoutes } from "./routes";


const main = async () => {
  validateEnv();
  // Don't need try/catch because if this throws the app is useless anyway
  const connection = await createConnection(ormConfig);
  await connection.runMigrations();

  const app = express();

  //middleware
  app.use(cors());
  app.use(morgan("common"));
  app.use(helmet());
  app.use(express.json());
  app.use(passport.initialize());

  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/westlands-accounts', westlandsAccountRoutes);
  app.use('/listings', listingRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`);
  });
}

main();