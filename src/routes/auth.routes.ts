import { Router } from "express";
import { authenticate } from "passport";
import { login } from "../services/auth.service";
import { validationMiddleware } from "../middleware/validation.middleware";
import { LoginDTO } from "../dtos/login.dto";
import { CreateUserDto } from "../dtos/createUser.dto";
const router = Router();

router.post('/login',  validationMiddleware(LoginDTO), authenticate('local'), login);
router.post('/register', validationMiddleware(CreateUserDto), )

export { router as authRoutes };