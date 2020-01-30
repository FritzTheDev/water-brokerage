import Router from "express-promise-router";
import { loginHandler } from "../controllers";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateUserDTO, LoginDTO } from "../dtos";

const authRoutes = Router();

authRoutes.post('/login',  validationMiddleware(LoginDTO), loginHandler);
authRoutes.post('/register', validationMiddleware(CreateUserDTO),  )

export { authRoutes };