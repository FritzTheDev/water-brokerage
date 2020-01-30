import Router from "express-promise-router";
import { authenticate } from "passport";
import { loginHandler } from "../controllers";
import { validationMiddleware } from "../middleware/validation.middleware";
import { LoginDTO } from "../dtos/login.dto";
import { CreateUserDto } from "../dtos/createUser.dto";

const router = Router();

router.post('/login',  validationMiddleware(LoginDTO), loginHandler);
router.post('/register', validationMiddleware(CreateUserDto),  )

export { router as authRoutes };