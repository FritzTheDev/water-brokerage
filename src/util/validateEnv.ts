import { cleanEnv, port, str } from "envalid";

export const validateEnv = () => {
  cleanEnv(process.env, {
    JWT_SECRET: str(),
    PORT: port(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: str(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str()
  });
};
