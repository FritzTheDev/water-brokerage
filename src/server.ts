import "dotenv/config";
import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as passport from "passport";
import { createConnection } from "typeorm";

import { ormConfig, validateEnv, configurePassport } from "./util";
import {
  authRoutes,
  userRoutes,
  westlandsAccountRoutes,
  listingRoutes
} from "./routes";

// top-level function
const main = async () => {
  // validates the presence env variables
  validateEnv();

  // Don't need try/catch because if this throws the app is useless anyway
  const connection = await createConnection(ormConfig);

  // run migrations on the database
  await connection.runMigrations();

  // create app instance
  const app = express();

  // middleware
  // cross origin resource sharing
  // TODO: configure to only work with selected origins
  app.use(cors());
  //logging
  app.use(morgan("common"));
  // security stuff (?)
  app.use(helmet());
  // body-parsing
  app.use(express.json());
  // passport initialization & config
  app.use(passport.initialize());
  configurePassport(passport);

  // routers
  app.use("/auth", authRoutes);
  // app.use("/users", userRoutes);
  // app.use("/westlands-accounts", westlandsAccountRoutes);
  // app.use("/listings", listingRoutes);

  // start the server
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`);
  });
};

// called to start the server
main();
