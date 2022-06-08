import {Router} from 'express';

import {signIn, signUp} from '../controllers/authController.js';
import {signUpValidation, signInValidation} from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post("/signin", signInValidation, signIn);
authRouter.post("/signup", signUpValidation, signUp);

export default authRouter;