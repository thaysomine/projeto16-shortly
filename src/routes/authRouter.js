import {Router} from 'express';

import {signIn, signUp} from '../controllers/authController.js';
import {signUpValidation} from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.get("/signin", signIn);
authRouter.post("/signup", signUpValidation, signUp);

export default authRouter;